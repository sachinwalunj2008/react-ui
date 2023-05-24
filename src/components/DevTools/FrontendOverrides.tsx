import * as React from 'react'
import { getEnvironmentName } from '../../module'
import { Button } from '../../module'

const { useState, useEffect } = React

const importMapUrl = `https://predict-assets${
  getEnvironmentName() === 'production' ? '' : '-staging'
}.pattern.com/import-map.json`

type ImportMap = {
  imports: Record<string, string>
}
type ImportMapState =
  | {
      state: 'loading'
    }
  | {
      state: 'resolved'
      data: ImportMap
    }
  | {
      state: 'error'
      error: Error
    }

export function FrontendOverrides(): JSX.Element {
  const [importMap, setImportMap] = useState<ImportMapState>({
    state: 'loading',
  })

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    fetch(importMapUrl, { signal })
      .then((response) => response.json())
      .then((data) => {
        setImportMap({ state: 'resolved', data })
      })
      .catch((error) => {
        if (!signal.aborted) {
          setImportMap({ state: 'error', error })
        }
      })

    return () => {
      controller.abort()
    }
  }, [])

  if (importMap.state === 'loading') return <div>loading...</div>
  if (importMap.state === 'error')
    return <div>There was an error: {importMap.error.message}</div>

  const allImports = Array.from(
    document.querySelectorAll('script[type="systemjs-importmap"]')
  ).reduce((prev, curr) => {
    const currentElement = curr as HTMLScriptElement
    if (currentElement.src === importMapUrl) {
      return {
        ...prev,
        ...importMap?.data?.imports,
      }
    }
    return {
      ...prev,
      ...JSON.parse(curr.innerHTML).imports,
    }
  }, {} as Record<string, string>)

  return (
    <table className='data-table'>
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }} className='pl-8 py-8'>
            Package Name
          </th>
          <th className='py-8 pl-8'>
            Current Value - enter 4-digit port # OR full url
          </th>
          <th>Reset to default</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(allImports).map((packageName) => (
          <FrontendOverride
            key={packageName}
            packageName={packageName}
            initialUrl={allImports[packageName]}
            defaultUrl={importMap.data.imports[packageName]}
          />
        ))}
      </tbody>
    </table>
  )
}

type FrontendOverrideProps = {
  packageName: string
  initialUrl: string
  defaultUrl: string
}
function FrontendOverride({
  packageName,
  initialUrl,
  defaultUrl,
}: FrontendOverrideProps): JSX.Element {
  const [url, setUrl] = useState(initialUrl)

  function setNewUrl(newUrl: string) {
    if (newUrl === defaultUrl) {
      // if setting the url to the one that's in the import map, remove the localStorage override
      localStorage.removeItem(
        `${window.frontendLocalStoragePrefix}${packageName}`
      )
    } else {
      localStorage.setItem(
        `${window.frontendLocalStoragePrefix}${packageName}`,
        newUrl
      )
    }
    setUrl(newUrl)
  }

  return (
    <tr>
      <td style={{ width: '1px' }}>{packageName}</td>
      <td>
        <div className='text-input'>
          <div className='input-container'>
            <input
              onFocus={(evt) => {
                evt.target.select()
              }}
              type='text'
              value={url}
              onChange={(evt) => {
                const fourDigitPortRegex = /^\d{4}$/g
                if (fourDigitPortRegex.test(evt.target.value)) {
                  const packageNameArr = packageName.split('/')
                  setNewUrl(
                    `http://localhost:${evt.target.value}/main.${
                      packageNameArr[packageNameArr.length - 1]
                    }.js`
                  )
                } else {
                  setNewUrl(evt.target.value)
                }
              }}
            />
          </div>
        </div>
      </td>
      <td style={{ width: '1px' }}>
        <Button onClick={() => setNewUrl(defaultUrl)}>Reset</Button>
      </td>
    </tr>
  )
}
