import React from 'react'
import { ComponentMeta } from '@storybook/react'
import ColorPalette from './ColorPalette/ColorPalette'

export default {
  title: 'Style Guide/Colors/Primary',
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>

export const Primary = (): JSX.Element => {
  return (
    <ColorPalette
      colorGroups={[
        {
          groupName: 'Blue',
          colors: [
            {
              name: 'light-blue',
              value: 'var(--light-blue)',
            },
            {
              name: 'medium-blue',
              value: 'var(--medium-blue)',
            },
            {
              name: 'blue',
              value: 'var(--blue)',
            },
            {
              name: 'dark-blue',
              value: 'var(--dark-blue)',
            },
          ],
        },
        {
          groupName: 'Green',
          colors: [
            {
              name: 'light-green',
              value: 'var(--light-green)',
            },
            {
              name: 'medium-green',
              value: 'var(--medium-green)',
            },
            {
              name: 'green',
              value: 'var(--green)',
            },
            {
              name: 'dark-green',
              value: 'var(--dark-green)',
            },
          ],
        },
        {
          groupName: 'Red',
          colors: [
            {
              name: 'light-red',
              value: 'var(--light-red)',
            },
            {
              name: 'medium-red',
              value: 'var(--medium-red)',
            },
            {
              name: 'red',
              value: 'var(--red)',
            },
            {
              name: 'dark-red',
              value: 'var(--dark-red)',
            },
          ],
        },
        {
          groupName: 'Yellow',
          colors: [
            {
              name: 'light-yellow',
              value: 'var(--light-yellow)',
            },
            {
              name: 'medium-yellow',
              value: 'var(--medium-yellow)',
            },
            {
              name: 'yellow',
              value: 'var(--yellow)',
            },
            {
              name: 'dark-yellow',
              value: 'var(--dark-yellow)',
            },
          ],
        },
        {
          groupName: 'Purple',
          colors: [
            {
              name: 'light-purple',
              value: 'var(--light-purple)',
            },
            {
              name: 'medium-purple',
              value: 'var(--medium-purple)',
            },
            {
              name: 'purple',
              value: 'var(--purple)',
            },
            {
              name: 'dark-purple',
              value: 'var(--dark-purple)',
            },
          ],
        },
      ]}
    />
  )
}
Primary.parameters = {
  layout: 'left',
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
