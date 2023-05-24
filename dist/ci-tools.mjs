/**
 *  This file does 2 major things:
 *  1) Uploads built JS files to S3.
 *  2) Pulls down the import-map, updates it, and the re-uploads it.
 *
 *  Relies on the following environment variables to be defined:
 *
 *  AWS_ACCESS_KEY_ID
 *  AWS_SECRET_ACCESS_KEY
 *    AWS credentials as outlined here https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html
 *
 *  BUCKET_NAME_SUFFIX
 *    type:string, default: ''
 *    Used to change which bucket the files are uploaded to in s3. For example, 'predict-assets' (if empty), or '-staging' would make 'predict-assets-staging'
 *
 *  S3_KEY_SUFFIX
 *    type: string, default: ''
 *    Used to change the s3 keyname, under the predict folder. Used for the predict DEMO website only. For example, '/predict/[sha1 hash]/main.js' (if empty), or 'demo/' would make it '/predict/demo/[sha1 hash]/main.js'
 */

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { readdir, lstat, readFile } from 'fs/promises'
import { execSync } from 'child_process'
import { cwd, exit } from 'process'
import { join } from 'path'

const GIT_COMMIT_SHA =
  // https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html
  process.env.AWS_COMMIT_ID ??
  // https://stackoverflow.com/a/35778030
  execSync('git rev-parse HEAD').toString().trim()

// const bucketName = `predict-assets${process.env.BUCKET_NAME_SUFFIX ?? ''}`
const bucketName = `test-frontenddeploys`
const localFolderPath = join(cwd(), './dist')
const s3Client = new S3Client({ region: 'us-east-1' })

/**
 * @typedef {Object} ImportMapValue
 * @property {string} name The name to be used as the importmap key, e.g. '@patterninc/predict'
 * @property {string} filename The emitted filename key associated with the importmap key, e.g. 'predict' for 'main.predict.js' or 'shelf-shared' for 'main.shelf-shared.js'
 */

/**
 * @typedef {Object} ProjectInfo
 * @property {string} projectName The name of the project, e.g. 'predict'
 * @property {ImportMapValue[]} importMapValues Config for updating the importmap
 */

/**
 * Uploads built files to S3, then updates the importmap
 * @param {ProjectInfo} projectInfo Project configuration settings
 * @returns {Promise<void>} Promise of whether it suceeded or not
 */
export async function performCiTasks(projectInfo) {
  try {
    const keyPrefix = `${projectInfo.projectName}/${
      process.env.S3_KEY_SUFFIX ?? ''
    }${GIT_COMMIT_SHA}/`

    const allFileNames = await getLocalFiles()

    console.log(formatStep('Uploading to S3'))
    // the goal is that this uploads all the files concurrently, instead of sequentually, so that it's faster
    await Promise.all(
      allFileNames.map((fileName) => uploadFile({ fileName, keyPrefix }))
    )

    // files uploaded, now to update the import map
    await manipulateImportMap({ projectInfo, keyPrefix })

    console.log(formatStep('Done'))
    exit()
  } catch (error) {
    console.error(formatStep('ERROR'))
    console.error(error)
    exit(1)
  }
}

async function getLocalFiles() {
  return readdir(localFolderPath)
}

/**
 * Uploads a built asset (for example, a .js file) to S3
 * @param {Object} params
 * @param {string} params.fileName
 * @param {string} params.keyPrefix
 * @return {Promise<void>}
 */
async function uploadFile({ fileName, keyPrefix }) {
  const fileLocation = join(localFolderPath, fileName)
  const fileInfo = await lstat(fileLocation)

  if (fileInfo.isDirectory()) {
    return
  }

  const fileContents = await readFile(fileLocation)
  const key = `${keyPrefix}${fileName}`

  console.log(`uploading ${fileLocation} to ${bucketName}${key}`)
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileContents,
    })
  )
}

/**
 * Downloads, updates, then uploads the importmap from S3
 * @param {Object} params
 * @param {ProjectInfo} params.projectInfo
 * @param {string} params.keyPrefix
 * @return {Promise<void>}
 */
async function manipulateImportMap({ projectInfo, keyPrefix }) {
  const importMapS3Key = `import-map.json`
  console.log(
    formatStep(`Updating importmap at ${bucketName}/${importMapS3Key}`)
  )

  // get the raw importmap file stream from s3
  const importMapRaw = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: importMapS3Key,
    })
  )

  // get the raw file stream and convert it to a string
  const importMapString = await new Promise((resolve, reject) => {
    // https://stackoverflow.com/a/36944450
    const dataChunks = []
    importMapRaw.Body.on('data', (chunk) => dataChunks.push(chunk))
    importMapRaw.Body.on('error', reject)
    importMapRaw.Body.once('end', () => resolve(dataChunks.join('')))
  })

  // parse the string to JSON
  const importMap = JSON.parse(importMapString)

  console.log('before:', importMap)

  // update each importmap value to the new url.
  projectInfo.importMapValues.forEach((value) => {
    importMap.imports[
      value.name
    ] = `https://${bucketName}.pattern.com/${keyPrefix}main.${value.filename}.js`
  })

  console.log('after:', importMap)

  // update the importmap in s3
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: importMapS3Key,
      Body: JSON.stringify(importMap),
    })
  )
}

function formatStep(text) {
  return `\n-----${text}-----`
}
