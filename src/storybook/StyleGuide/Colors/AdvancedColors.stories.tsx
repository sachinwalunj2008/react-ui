import React from 'react'
import { ComponentMeta } from '@storybook/react'
import ColorPalette from './ColorPalette/ColorPalette'

export default {
  title: 'Style Guide/Colors/Advanced',
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>

export const Advanced = (): JSX.Element => {
  return (
    <ColorPalette
      colorGroups={[
        {
          groupName: 'Lavender',
          colors: [
            {
              name: 'light-lavender',
              value: 'var(--light-lavender)',
            },
            {
              name: 'lavender',
              value: 'var(--lavender)',
              whiteFont: true,
            },
          ],
        },
        {
          groupName: 'Orange',
          colors: [
            {
              name: 'light-orange',
              value: 'var(--light-orange)',
            },
            {
              name: 'orange',
              value: 'var(--orange)',
            },
          ],
        },
        {
          groupName: 'Pink',
          colors: [
            {
              name: 'light-pink',
              value: 'var(--light-pink)',
            },
            {
              name: 'pink',
              value: 'var(--pink)',
            },
          ],
        },
        {
          groupName: 'Teal',
          colors: [
            {
              name: 'light-teal',
              value: 'var(--light-teal)',
            },
            {
              name: 'teal',
              value: 'var(--teal)',
            },
          ],
        },
      ]}
    />
  )
}
Advanced.parameters = {
  layout: 'left',
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
