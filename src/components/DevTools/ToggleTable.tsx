import React, { useCallback, useContext, useMemo, useState } from 'react'
import { StandardTable, Toggle, hasValue } from '../../module'
import { ToggleProviderContext } from '../ToggleProvider/ToggleProvider'

type DataItem = {
  key: string
  enabled: boolean
}

type ToggleTableProps = {
  data: Array<DataItem>
  rerenderCallout: CalloutType
}

type CalloutType = React.Dispatch<React.SetStateAction<Record<string, unknown>>>

const ToggleTable = ({
  data,
  rerenderCallout,
}: ToggleTableProps): JSX.Element => {
  const { toggles } = useContext(ToggleProviderContext)

  const checkEnvDifference = (toggleKey: string) => {
    const isFeatureOn = toggles?.some(
      (toggle) => toggle.key === toggleKey && toggle.enabled
    )

    return localStorage.getItem(toggleKey) &&
      (localStorage.getItem(toggleKey) === 'true') !== isFeatureOn
      ? 'bgc-light-orange'
      : ''
  }

  const tableConfig = [
    {
      label: 'Key',
      name: 'key',
      noSort: true,
      mainColumn: true,
      cell: {
        children: (d: DataItem) => {
          return <div style={{ wordBreak: 'break-all' }}>{d.key}</div>
        },
        className: (d: DataItem) => checkEnvDifference(d.key),
      },
    },
    {
      label: 'Toggle Override',
      name: 'toggle_override',
      noSort: true,
      cell: {
        children: (d: DataItem) => {
          const isFeatureOn = d.enabled,
            toggleOn = hasValue(localStorage.getItem(d.key))
              ? localStorage.getItem(d.key) === 'true'
              : isFeatureOn
          return (
            <div className='flex justify-content-end'>
              <ToggleValue
                value={toggleOn}
                rerenderCallout={rerenderCallout}
                name={d.key}
              />
            </div>
          )
        },
        className: (d: DataItem) => checkEnvDifference(d.key),
      },
    },
  ]

  type DataType = {
    application?: string
    key: string
    enabled: boolean
  }

  const tableGroupConfig = useCallback(
    (
      name: 'Predict' | 'Shelf' | 'Library' | 'Toggle' | 'Connect' | 'Admin'
    ) => {
      return {
        groupHeader: name,
        check: (data: DataType): boolean => data.application === name,
        groupAccordion: {
          isCollapsed: false,
          groupKey: name.toLowerCase(),
        },
      }
    },
    []
  )

  const tableGroups = useMemo(
    () => [
      tableGroupConfig('Admin'),
      tableGroupConfig('Connect'),
      tableGroupConfig('Predict'),
      tableGroupConfig('Shelf'),
      tableGroupConfig('Toggle'),
      // We want the Library toggles to appear as the last group in every application.
      tableGroupConfig('Library'),
    ],
    [tableGroupConfig]
  )

  return (
    <StandardTable
      data={data}
      config={tableConfig}
      dataKey='key'
      hasData={data?.length > 0}
      loading={false}
      hasMore={false}
      tableId={'devtools-toggles'}
      sort={() => {
        return
      }}
      sortBy={{ prop: 'name', flip: false }}
      noDataFields={{
        primaryText: `No Toggles Found`,
        secondaryText: `Please update the search field to see Toggles.`,
      }}
      getData={() => null}
      successStatus={true}
      customHeight='auto'
      customWidth='100%'
      showGroups
      groups={tableGroups}
    />
  )
}

export default ToggleTable

const ToggleValue = ({
  name,
  value,
  rerenderCallout,
}: {
  name: string
  value: boolean
  rerenderCallout: CalloutType
}): JSX.Element => {
  const [checked, setChecked] = useState(value)

  const callout = (val: boolean) => {
    setChecked(val)
    localStorage.setItem(name, val.toString())
    rerenderCallout({})
  }

  return <Toggle checked={checked} callout={callout} />
}
