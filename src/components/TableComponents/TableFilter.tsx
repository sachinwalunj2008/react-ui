import React from 'react'
import TableFilterPill from './TableFilterPill'
import { Icon, Button, Tippy } from '../../module'
import Styles from './_table.module.scss'

export type ActiveFilterProps = {
  [key: string]: {
    /** If the value is a list, it will be displayed on a tooltip */
    value: number | number[] | string[]
    comparison_value: string //need to have a list of accepted values
    label: string
  }
}

type TableFilterProps = {
  activeFilters: ActiveFilterProps
  remove: (filter?: string) => void
}

const TableFilter = ({
  activeFilters,
  remove,
}: TableFilterProps): JSX.Element => {
  return (
    <div className='box p-16 mb-16 flex align-items-center'>
      <Icon icon='filter' customClass='mr-16 svg-purple' />
      <div className={`flex align-items-center flex-wrap ${Styles.filtersGap}`}>
        {Object.keys(activeFilters).length > 0 ? (
          Object.keys(activeFilters).map((af) => (
            <span key={af} className='mr-8'>
              {Array.isArray(activeFilters[af].value) ? (
                <Tippy
                  placement='top'
                  className='no-padding'
                  content={
                    <div className={`${Styles.pillTooltipContainer}`}>
                      <ul className={`${Styles.pillTooltip} `}>
                        {(activeFilters[af].value as (number | string)[])?.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  }
                  maxWidth='250px'
                  appendTo={document.body}
                  interactive
                >
                  <div>
                    <TableFilterPill
                      text={`${activeFilters[af].label}`}
                      remove={() => remove(af)}
                    />
                  </div>
                </Tippy>
              ) : (
                <TableFilterPill
                  text={`${activeFilters[af].label}`}
                  remove={() => remove(af)}
                />
              )}
            </span>
          ))
        ) : (
          <span className='fc-purple fs-14'>
            No filter added. Please click on a column header to apply a custom
            filter.
          </span>
        )}
        {Object.keys(activeFilters).length > 0 && (
          <Button styleType='text-red' onClick={() => remove()}>
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}

export default TableFilter
