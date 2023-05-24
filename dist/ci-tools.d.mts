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
export function performCiTasks(projectInfo: ProjectInfo): Promise<void>;
export type ImportMapValue = {
    /**
     * The name to be used as the importmap key, e.g. '@patterninc/predict'
     */
    name: string;
    /**
     * The emitted filename key associated with the importmap key, e.g. 'predict' for 'main.predict.js' or 'shelf-shared' for 'main.shelf-shared.js'
     */
    filename: string;
};
export type ProjectInfo = {
    /**
     * The name of the project, e.g. 'predict'
     */
    projectName: string;
    /**
     * Config for updating the importmap
     */
    importMapValues: ImportMapValue[];
};
