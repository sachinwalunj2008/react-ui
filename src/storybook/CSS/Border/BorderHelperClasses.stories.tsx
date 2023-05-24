import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Borders',
  parameters: {
    docs: {
      page: () => <HelperClassTemplate />,
    },
  },
} as Record<string, unknown>

const Template = (args) => <HelperClassExample examples={args.values} />

const borderClasses = [
  {
    groupName: 'Borders',
    classNames: [
      { css: 'border: 1px solid;', name: 'bdr' },
      { css: 'border-top: 1px solid;', name: 'bdrt' },
      { css: 'border-right: 1px solid;', name: 'bdrr' },
      { css: 'border-bottom: 1px solid;', name: 'bdrb' },
      { css: 'border-left: 1px solid;', name: 'bdrl' },
    ],
  },
  {
    groupName: 'Border Radius',
    classNames: [
      { css: 'border-radius: 4px;', name: 'bdr bdrr-4' },
      { css: 'border-radius: 8px;', name: 'bdr bdrr-8' },
      { css: 'border-radius: 16px;', name: 'bdr bdrr-16' },
      { css: 'border-radius: 1000px;', name: 'bdr bdrr-1000' },
    ],
  },
]

const valuesArr = borderClasses.map((fClass) => {
  return {
    groupName: fClass.groupName,
    arr: fClass.classNames.map((className) => {
      return {
        label: className.name,
        subtitle: className.css,
        children: (
          <div
            style={{ width: 100, height: 100 }}
            className={`${className.name} bgc-light-purple`}
          ></div>
        ),
      }
    }),
  }
})

export const borders = Template.bind({})
borders.args = {
  values: valuesArr,
}
borders.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
