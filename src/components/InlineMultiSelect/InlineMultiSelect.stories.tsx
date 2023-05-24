import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import {
  InlineMultiSelect,
  InlineMultiSelectAllCheckbox,
  InlineMultiSelectListGroupHeader,
  InlineMultiSelectListRow,
  InlineMultiSelectSearch,
} from './InlineMultiSelect'
import { notEmpty, hasValue, Button } from '../../module'

export default {
  title: 'Components/FormComponents/MultiSelect/InlineMultiSelect',
  component: InlineMultiSelect,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof InlineMultiSelect>

type Headers = {
  id: number
  label: string
  isChecked: boolean
}

const Template: ComponentStory<typeof InlineMultiSelect> = (args) => {
  const list = [
      { id: 1, label: 'Option 1', isChecked: false },
      { id: 2, label: 'Option 2', isChecked: false },
      { id: 3, label: 'Option 3', isChecked: false },
    ],
    [search, setSearch] = useState(''),
    [selectAll, setSelectAll] = useState(false),
    [searchList, setSearchList] = useState({
      selected: [{ id: 4, label: 'Option 4', isChecked: true }],
      unselected: list,
    })

  return (
    <InlineMultiSelect
      showNoListData={notEmpty(search)}
      noListDataProps={{
        primaryText: 'No Results Found.',
        secondaryText: 'Please Update Your Search.',
      }}
      CustomRow={(header: Headers) => (
        <InlineMultiSelectListRow
          callout={(id, shouldCheck) => {
            if (shouldCheck) {
              const findResult = searchList.unselected.find((u) => u.id === id),
                findResultIndex = searchList.unselected.findIndex(
                  (u) => u.id === id
                ),
                selected = [...searchList.selected, findResult].map((s) => {
                  return {
                    ...s,
                    isChecked: true,
                  }
                })
              searchList.unselected.splice(findResultIndex, 1)
              setSearchList({
                ...searchList,
                // @ts-expect-error TODO: Need to understand why we are getting type errors here
                selected,
              })
            } else {
              const findResult = searchList.selected.find((s) => s.id === id),
                findResultIndex = searchList.selected.findIndex(
                  (s) => s.id === id
                ),
                unselected = [...searchList.unselected, findResult].map((u) => {
                  return {
                    ...u,
                    isChecked: false,
                  }
                })
              searchList.selected.splice(findResultIndex, 1)
              setSearchList({
                ...searchList,
                // @ts-expect-error TODO: Need to understand why we are getting type errors here
                unselected,
              })
            }
          }}
          checked={header.isChecked}
          key={header.id}
          label={header.label}
          stateName={header.id}
        />
      )}
      CustomGroupHeader={
        <InlineMultiSelectListGroupHeader>
          <Button
            as='button'
            styleType='text-blue'
            style={{ fontSize: '10px' }}
            onClick={() => {
              setSearchList((prevState) => ({
                selected: [],
                unselected: prevState.unselected.concat(
                  prevState.selected.map((u) => ({
                    ...u,
                    isChecked: false,
                  }))
                ),
              }))
            }}
          >
            Clear
          </Button>
        </InlineMultiSelectListGroupHeader>
      }
      CustomSearch={
        <InlineMultiSelectSearch
          placeholder='Search'
          search={search}
          searchCallout={(value) => {
            if (hasValue(value)) {
              setSearch(value)
            }
          }}
          autoFocus
        />
      }
      CustomSelectAll={
        <InlineMultiSelectAllCheckbox
          checked={false}
          disabled={false}
          callout={() => {
            if (!selectAll) {
              setSearchList((prevState) => ({
                selected: prevState.selected.concat(
                  prevState.unselected.map((u) => ({
                    ...u,
                    isChecked: true,
                  }))
                ),
                unselected: [],
              }))
            } else {
              setSearchList((prevState) => ({
                selected: [],
                unselected: prevState.unselected.concat(
                  prevState.selected.map((u) => ({
                    ...u,
                    isChecked: false,
                  }))
                ),
              }))
            }
            setSelectAll((prevState) => !prevState)
          }}
          label='Select All'
        />
      }
      selectAllChecked={
        (selectAll || searchList.selected.length === 4) &&
        searchList.unselected.length === 0
      }
      listItems={searchList}
    />
  )
}

export const basic = Template.bind({})
basic.args = {}

// TODO: Add more stories
