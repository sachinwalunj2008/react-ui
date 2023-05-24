import React, { useEffect, useState } from 'react'
import { getEnvironmentName, Button } from '../../module'

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

const FrontendOverrideTable = (): JSX.Element => {
  const [importMap, setImportMap] = useState<ImportMapState>({
    state: 'loading',
  })
  const [url, setUrl] = useState<{
    [packageName: string]: string
  }>({})

  function setNewUrl({
    newUrl,
    packageName,
  }: {
    newUrl: string
    packageName: string
  }) {
    if (importMap.state === 'resolved') {
      const defaultUrl = importMap?.data?.imports?.[packageName]
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
      setUrl({ [packageName]: newUrl })
    }
  }

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
  }, {})

  type DataItem = {
    packageName: string
  }

  const tableConfig = [
    {
      label: 'Package Name',
      name: 'packageName',
      noSort: true,
      mainColumn: true,
      cell: {
        children: (d: DataItem) => {
          return <div>{d.packageName}</div>
        },
      },
    },
    {
      label: 'Current Value',
      name: 'current_value',
      noSort: true,
      tooltip: {
        content:
          'Enter a full url or a 4-digit port number to auto populate the input field.',
      },
      cell: {
        children: (d: DataItem) => {
          return (
            <input
              onFocus={(evt) => {
                evt.target.select()
              }}
              type='text'
              value={url[d.packageName]}
              onChange={(evt) => {
                const fourDigitPortRegex = /^\d{4}$/g
                if (fourDigitPortRegex.test(evt.target.value)) {
                  const packageNameArr = d.packageName.split('/')
                  setNewUrl({
                    packageName: d.packageName,
                    newUrl: `http://localhost:${evt.target.value}/main.${
                      packageNameArr[packageNameArr.length - 1]
                    }.js`,
                  })
                } else {
                  setNewUrl({
                    packageName: d.packageName,
                    newUrl: evt.target.value,
                  })
                }
              }}
            />
          )
        },
      },
    },
    {
      label: '',
      name: '',
      noSort: true,
      isButton: true,
      cell: {
        children: (d: DataItem) => {
          return (
            <Button
              onClick={() =>
                setNewUrl({
                  packageName: d.packageName,
                  newUrl: importMap.data.imports[d.packageName],
                })
              }
            >
              Reset
            </Button>
          )
        },
      },
    },
  ]

  return <div>FE Overrides table to go here...</div>
}

export default FrontendOverrideTable
