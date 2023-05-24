import React from 'react'
import { HelperClassExample, HelperClassTemplate } from '../HelperClassTemplate'

export default {
  title: 'CSS Helper Classes/Layout/Flexbox',
  parameters: {
    docs: {
      page: () => <HelperClassTemplate />,
    },
  },
} as Record<string, unknown>

const Template = (args) => <HelperClassExample examples={args.values} />

const flexClasses = [
    {
      groupName: 'Flex',
      classNames: [
        { css: 'display: flex;', name: 'flex' },
        { css: 'flex-direction: column;', name: 'flex-direction-column' },
      ],
    },
    {
      groupName: 'Flex Wrap',
      classNames: [{ css: 'flex-wrap: wrap;', name: 'flex-wrap' }],
      elementNum: 8,
    },
    {
      groupName: 'Justify Content',
      classNames: [
        { css: 'justify-content: flex-end;', name: 'justify-content-end' },
        { css: 'justify-content: center;', name: 'justify-content-center' },
        {
          css: 'justify-content: space-between;',
          name: 'justify-content-between',
        },
        {
          css: 'justify-content: space-around;',
          name: 'justify-content-around',
        },
      ],
    },
    {
      groupName: 'Align Items',
      classNames: [
        { css: 'align-items: center;', name: 'align-items-center' },
        { css: 'align-items: flex-start;', name: 'align-items-flex-start' },
        { css: 'align-self: center;', name: 'align-self-center' },
      ],
    },
  ],
  colors = [
    'purple',
    'dark-purple',
    'medium-purple',
    'blue',
    'dark-blue',
    'orange',
    'lavender',
    'green',
  ]

const valuesArr = flexClasses.map((fClass, index) => {
  const mapItems = fClass.elementNum || 3

  return {
    groupName: fClass.groupName,
    arr: fClass.classNames.map((className) => {
      const innerFlexClass = className.name.includes('self')
        ? className.name
        : ''

      return {
        label: className.name,
        subtitle: className.css,
        children: (
          <div
            style={{ width: 100, height: 100 }}
            className={`${className.name} ${index > 0 ? 'flex' : ''} bdr`}
          >
            {[...Array(mapItems).keys()].map((element) => (
              <div
                key={colors[element]}
                style={{ width: 20, height: 20 }}
                className={`bgc-${colors[element]} ${innerFlexClass}`}
              ></div>
            ))}
          </div>
        ),
      }
    }),
  }
})

export const flexbox = Template.bind({})
flexbox.args = {
  values: valuesArr,
}
flexbox.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
