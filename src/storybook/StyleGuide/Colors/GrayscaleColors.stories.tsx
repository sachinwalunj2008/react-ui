import React from 'react'
import { ComponentMeta } from '@storybook/react'
import ColorPalette from './ColorPalette/ColorPalette'

export default {
  title: 'Style Guide/Colors/Grayscale',
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>

export const Grayscale = (): JSX.Element => {
  return (
    <ColorPalette
      colorGroups={[
        {
          groupName: 'Grayscale',
          colors: [
            {
              name: 'white',
              value: 'var(--white)',
              hasBorder: true,
            },
            {
              name: 'faint-gray',
              value: 'var(--faint-gray)',
              whiteFont: true,
            },
            {
              name: 'lighter-gray',
              value: 'var(--lighter-gray)',
            },
            {
              name: 'light-gray',
              value: 'var(--light-gray)',
              whiteFont: true,
            },
            {
              name: 'medium-gray',
              value: 'var(--medium-gray)',
            },
            {
              name: 'gray',
              value: 'var(--gray)',
              whiteFont: true,
            },
            {
              name: 'dark-gray',
              value: 'var(--dark-gray)',
            },
            {
              name: 'black',
              value: 'var(--black)',
              whiteFont: true,
            },
          ],
        },
      ]}
    />
  )
}
Grayscale.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
