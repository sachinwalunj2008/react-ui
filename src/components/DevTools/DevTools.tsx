import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Tabs,
  getApiUrlPrefix,
  getEnvironmentName,
  Button,
  SideDrawer,
  Tag,
  SearchBar,
  useMediaQuery,
} from '../../module'
import { FrontendOverrides } from './FrontendOverrides'
import styles from './_dev-tools.module.scss'
import ToggleTable from './ToggleTable'
import { ToggleProviderContext } from '../ToggleProvider/ToggleProvider'

const { useState, useEffect } = React
const { createPortal } = ReactDOM

type CalloutType = React.Dispatch<React.SetStateAction<Record<string, unknown>>>
type DevToolsProps = {
  backendNames: string[]
  rerenderCallout: CalloutType
}
export function DevTools({
  backendNames = [],
  rerenderCallout,
}: DevToolsProps): JSX.Element | null {
  const showDevtools = localStorage.getItem('pattern-devtools') === 'true',
    [showPanel, setShowPanel] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    [activeSubTab, setActiveSubTab] = useState(0),
    [searchTerm, setSearchTerm] = useState(''),
    { toggles } = React.useContext(ToggleProviderContext),
    isNotMobile = useMediaQuery({ type: 'min', breakpoint: 'md' })

  const formattedToggleData = (toggles || [])
    .filter((toggle) => {
      if (searchTerm) {
        return toggle.key.includes(searchTerm)
      }
      return true
    })
    ?.sort((a, b) => {
      // sort alphabetically
      const upperA = a.key.toUpperCase()
      const upperB = b.key.toUpperCase()
      if (upperA < upperB) return -1
      if (upperA > upperB) return 1
      return 0
    })

  if (!showDevtools) return null
  return (
    <>
      {createPortal(
        <Button
          as='unstyled'
          onClick={() => setShowPanel((prev) => !prev)}
          className={styles.button}
        >
          <Tag color='dark-gray'>Pattern DevTools</Tag>
        </Button>,
        document.body
      )}
      <SideDrawer
        isOpen={showPanel}
        closeCallout={() => setShowPanel((prev) => !prev)}
        size='lg'
        headerContent='Pattern DevTools'
      >
        <Tabs
          tabs={[
            { id: 0, tabName: 'Feature Toggles' },
            { id: 1, tabName: 'Overrides' },
          ]}
          customId='developertools-tabs'
          callout={(tabId: number) => setActiveTab(tabId)}
        />

        <div className='pb-24'>
          {activeTab === 0 && (
            <>
              <div className={`mb-8 ${isNotMobile ? 'flex' : ''}`}>
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder='Toggle Key'
                />
              </div>
              <ToggleTable
                data={formattedToggleData}
                rerenderCallout={rerenderCallout}
              />
            </>
          )}

          {activeTab === 1 && (
            <>
              <Tabs
                tabs={[
                  { id: 0, tabName: 'Frontend' },
                  { id: 1, tabName: 'Backend' },
                ]}
                customId='developertools-tabs'
                callout={(tabId: number) => setActiveSubTab(tabId)}
                subtabs
              />
              <>
                {activeSubTab === 0 && <FrontendOverrides />}

                {activeSubTab === 1 && (
                  <table className='data-table'>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left' }} className='pl-8 py-8'>
                          Backend Name
                        </th>
                        <th className='text-center py-8'>Current Endpoint</th>
                        <th className='text-center py-8'>Local Settings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backendNames.map((backend) => (
                        <BackendOverride key={backend} name={backend} />
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            </>
          )}
        </div>
      </SideDrawer>
    </>
  )
}

type BackendOverrideProps = {
  name: string
}
function BackendOverride({ name }: BackendOverrideProps) {
  const [backendOverride, setBackendOverride] = useState(() => {
    const currentUrl = getApiUrlPrefix(name)
    let environment = 'production'
    if (currentUrl.includes('/staging')) environment = 'development|staging'
    if (localStorage.getItem(`localBackendOverride:${name}:env`)) {
      environment =
        localStorage.getItem(`localBackendOverride:${name}:env`) ?? environment
    }
    return {
      environment,
      endpoint: currentUrl,
    }
  })

  useEffect(() => {
    const localStorageKey = `localBackendOverride:${name}`
    if (backendOverride.environment.includes(getEnvironmentName())) {
      localStorage.removeItem(localStorageKey)
      localStorage.removeItem(`${localStorageKey}:env`)
    } else {
      localStorage.setItem(localStorageKey, backendOverride.endpoint)
      localStorage.setItem(
        `${localStorageKey}:env`,
        backendOverride.environment
      )
    }
  }, [backendOverride.environment, backendOverride.endpoint, name])

  return (
    <tr>
      <td>{name}</td>
      <td className='text-center'>{backendOverride.endpoint}</td>
      <td className='text-center'>
        <div style={{ display: 'inline-block' }} className='px-16'>
          <div>Prod</div>
          <input
            type='radio'
            value='prod'
            checked={backendOverride.environment === 'production'}
            onChange={() =>
              setBackendOverride({
                endpoint: `/${name}`,
                environment: 'production',
              })
            }
          />
        </div>
        <div style={{ display: 'inline-block' }} className='px-16'>
          <div>Staging</div>
          <input
            type='radio'
            value='staging'
            checked={backendOverride.environment.includes('staging')}
            onChange={() =>
              setBackendOverride({
                endpoint: `/staging-${name}`,
                environment: 'development|staging',
              })
            }
          />
        </div>
        <div style={{ display: 'inline-block' }} className='px-16'>
          <div>Custom</div>
          <input
            type='text'
            onFocus={(evt) => {
              evt.target.select()
            }}
            onChange={(evt) => {
              const fourDigitPortRegex = /^\d{4}$/g
              const newEndpoint = fourDigitPortRegex.test(evt.target.value)
                ? `http://localhost:${evt.target.value}`
                : evt.target.value
              setBackendOverride({
                environment: 'custom',
                endpoint: newEndpoint,
              })
            }}
            value={
              backendOverride.environment === 'custom'
                ? backendOverride.endpoint
                : ''
            }
          />
        </div>
      </td>
    </tr>
  )
}
