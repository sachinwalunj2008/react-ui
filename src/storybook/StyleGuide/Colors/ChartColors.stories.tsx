import React from 'react'
import { ComponentMeta } from '@storybook/react'
import ColorPalette from './ColorPalette/ColorPalette'

export default {
  title: 'Style Guide/Colors/Chart',
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>

export const Chart = (): JSX.Element => {
  return (
    <ColorPalette
      colorGroups={[
        {
          groupName: 'Blue',
          colors: [
            {
              name: 'chart-light-6-blue',
              value: 'var(--chart-light-6-blue)',
            },
            {
              name: 'chart-light-5-blue',
              value: 'var(--chart-light-5-blue)',
            },
            {
              name: 'chart-light-4-blue',
              value: 'var(--chart-light-4-blue)',
            },
            {
              name: 'chart-light-3-blue',
              value: 'var(--chart-light-3-blue)',
            },
            {
              name: 'chart-light-2-blue',
              value: 'var(--chart-light-2-blue)',
            },
            {
              name: 'chart-light-1-blue',
              value: 'var(--chart-light-1-blue)',
            },
            {
              name: 'chart-standard-blue',
              value: 'var(--chart-standard-blue)',
            },
            {
              name: 'chart-dark-1-blue',
              value: 'var(--chart-dark-1-blue)',
            },
            {
              name: 'chart-dark-2-blue',
              value: 'var(--chart-dark-2-blue)',
            },
            {
              name: 'chart-dark-3-blue',
              value: 'var(--chart-dark-3-blue)',
            },
            {
              name: 'chart-dark-4-blue',
              value: 'var(--chart-dark-4-blue)',
            },
            {
              name: 'chart-dark-5-blue',
              value: 'var(--chart-dark-5-blue)',
            },
          ],
        },
        {
          groupName: 'Green',
          colors: [
            {
              name: 'chart-light-6-green',
              value: 'var(--chart-light-6-green)',
            },
            {
              name: 'chart-light-5-green',
              value: 'var(--chart-light-5-green)',
            },
            {
              name: 'chart-light-4-green',
              value: 'var(--chart-light-4-green)',
            },
            {
              name: 'chart-light-3-green',
              value: 'var(--chart-light-3-green)',
            },
            {
              name: 'chart-light-2-green',
              value: 'var(--chart-light-2-green)',
            },
            {
              name: 'chart-light-1-green',
              value: 'var(--chart-light-1-green)',
            },
            {
              name: 'chart-standard-green',
              value: 'var(--chart-standard-green)',
            },
            {
              name: 'chart-dark-1-green',
              value: 'var(--chart-dark-1-green)',
            },
            {
              name: 'chart-dark-2-green',
              value: 'var(--chart-dark-2-green)',
            },
            {
              name: 'chart-dark-3-green',
              value: 'var(--chart-dark-3-green)',
            },
            {
              name: 'chart-dark-4-green',
              value: 'var(--chart-dark-4-green)',
            },
            {
              name: 'chart-dark-5-green',
              value: 'var(--chart-dark-5-green)',
            },
          ],
        },
        {
          groupName: 'Red',
          colors: [
            {
              name: 'chart-light-6-red',
              value: 'var(--chart-light-6-red)',
            },
            {
              name: 'chart-light-5-red',
              value: 'var(--chart-light-5-red)',
            },
            {
              name: 'chart-light-4-red',
              value: 'var(--chart-light-4-red)',
            },
            {
              name: 'chart-light-3-red',
              value: 'var(--chart-light-3-red)',
            },
            {
              name: 'chart-light-2-red',
              value: 'var(--chart-light-2-red)',
            },
            {
              name: 'chart-light-1-red',
              value: 'var(--chart-light-1-red)',
            },
            {
              name: 'chart-standard-red',
              value: 'var(--chart-standard-red)',
            },
            {
              name: 'chart-dark-1-red',
              value: 'var(--chart-dark-1-red)',
            },
            {
              name: 'chart-dark-2-red',
              value: 'var(--chart-dark-2-red)',
            },
            {
              name: 'chart-dark-3-red',
              value: 'var(--chart-dark-3-red)',
            },
            {
              name: 'chart-dark-4-red',
              value: 'var(--chart-dark-4-red)',
            },
            {
              name: 'chart-dark-5-red',
              value: 'var(--chart-dark-5-red)',
            },
          ],
        },
        {
          groupName: 'Yellow',
          colors: [
            {
              name: 'chart-light-6-yellow',
              value: 'var(--chart-light-6-yellow)',
            },
            {
              name: 'chart-light-5-yellow',
              value: 'var(--chart-light-5-yellow)',
            },
            {
              name: 'chart-light-4-yellow',
              value: 'var(--chart-light-4-yellow)',
            },
            {
              name: 'chart-light-3-yellow',
              value: 'var(--chart-light-3-yellow)',
            },
            {
              name: 'chart-light-2-yellow',
              value: 'var(--chart-light-2-yellow)',
            },
            {
              name: 'chart-light-1-yellow',
              value: 'var(--chart-light-1-yellow)',
            },
            {
              name: 'chart-standard-yellow',
              value: 'var(--chart-standard-yellow)',
            },
            {
              name: 'chart-dark-1-yellow',
              value: 'var(--chart-dark-1-yellow)',
            },
            {
              name: 'chart-dark-2-yellow',
              value: 'var(--chart-dark-2-yellow)',
            },
            {
              name: 'chart-dark-3-yellow',
              value: 'var(--chart-dark-3-yellow)',
            },
            {
              name: 'chart-dark-4-yellow',
              value: 'var(--chart-dark-4-yellow)',
            },
            {
              name: 'chart-dark-5-yellow',
              value: 'var(--chart-dark-5-yellow)',
            },
          ],
        },
        {
          groupName: 'Purple',
          colors: [
            {
              name: 'chart-light-6-purple',
              value: 'var(--chart-light-6-purple)',
            },
            {
              name: 'chart-light-5-purple',
              value: 'var(--chart-light-5-purple)',
            },
            {
              name: 'chart-light-4-purple',
              value: 'var(--chart-light-4-purple)',
            },
            {
              name: 'chart-light-3-purple',
              value: 'var(--chart-light-3-purple)',
            },
            {
              name: 'chart-light-2-purple',
              value: 'var(--chart-light-2-purple)',
            },
            {
              name: 'chart-light-1-purple',
              value: 'var(--chart-light-1-purple)',
            },
            {
              name: 'chart-standard-purple',
              value: 'var(--chart-standard-purple)',
            },
            {
              name: 'chart-dark-1-purple',
              value: 'var(--chart-dark-1-purple)',
            },
            {
              name: 'chart-dark-2-purple',
              value: 'var(--chart-dark-2-purple)',
            },
            {
              name: 'chart-dark-3-purple',
              value: 'var(--chart-dark-3-purple)',
            },
            {
              name: 'chart-dark-4-purple',
              value: 'var(--chart-dark-4-purple)',
            },
            {
              name: 'chart-dark-5-purple',
              value: 'var(--chart-dark-5-purple)',
            },
          ],
        },
        {
          groupName: 'Royal',
          colors: [
            {
              name: 'chart-light-6-royal',
              value: 'var(--chart-light-6-royal)',
            },
            {
              name: 'chart-light-5-royal',
              value: 'var(--chart-light-5-royal)',
            },
            {
              name: 'chart-light-4-royal',
              value: 'var(--chart-light-4-royal)',
            },
            {
              name: 'chart-light-3-royal',
              value: 'var(--chart-light-3-royal)',
            },
            {
              name: 'chart-light-2-royal',
              value: 'var(--chart-light-2-royal)',
            },
            {
              name: 'chart-light-1-royal',
              value: 'var(--chart-light-1-royal)',
            },
            {
              name: 'chart-standard-royal',
              value: 'var(--chart-standard-royal)',
            },
            {
              name: 'chart-dark-1-royal',
              value: 'var(--chart-dark-1-royal)',
            },
            {
              name: 'chart-dark-2-royal',
              value: 'var(--chart-dark-2-royal)',
            },
            {
              name: 'chart-dark-3-royal',
              value: 'var(--chart-dark-3-royal)',
            },
            {
              name: 'chart-dark-4-royal',
              value: 'var(--chart-dark-4-royal)',
            },
            {
              name: 'chart-dark-5-royal',
              value: 'var(--chart-dark-5-royal)',
            },
          ],
        },
        {
          groupName: 'Teal',
          colors: [
            {
              name: 'chart-light-6-teal',
              value: 'var(--chart-light-6-teal)',
            },
            {
              name: 'chart-light-5-teal',
              value: 'var(--chart-light-5-teal)',
            },
            {
              name: 'chart-light-4-teal',
              value: 'var(--chart-light-4-teal)',
            },
            {
              name: 'chart-light-3-teal',
              value: 'var(--chart-light-3-teal)',
            },
            {
              name: 'chart-light-2-teal',
              value: 'var(--chart-light-2-teal)',
            },
            {
              name: 'chart-light-1-teal',
              value: 'var(--chart-light-1-teal)',
            },
            {
              name: 'chart-standard-teal',
              value: 'var(--chart-standard-teal)',
            },
            {
              name: 'chart-dark-1-teal',
              value: 'var(--chart-dark-1-teal)',
            },
            {
              name: 'chart-dark-2-teal',
              value: 'var(--chart-dark-2-teal)',
            },
            {
              name: 'chart-dark-3-teal',
              value: 'var(--chart-dark-3-teal)',
            },
            {
              name: 'chart-dark-4-teal',
              value: 'var(--chart-dark-4-teal)',
            },
            {
              name: 'chart-dark-5-teal',
              value: 'var(--chart-dark-5-teal)',
            },
          ],
        },
        {
          groupName: 'Pink',
          colors: [
            {
              name: 'chart-light-6-pink',
              value: 'var(--chart-light-6-pink)',
            },
            {
              name: 'chart-light-5-pink',
              value: 'var(--chart-light-5-pink)',
            },
            {
              name: 'chart-light-4-pink',
              value: 'var(--chart-light-4-pink)',
            },
            {
              name: 'chart-light-3-pink',
              value: 'var(--chart-light-3-pink)',
            },
            {
              name: 'chart-light-2-pink',
              value: 'var(--chart-light-2-pink)',
            },
            {
              name: 'chart-light-1-pink',
              value: 'var(--chart-light-1-pink)',
            },
            {
              name: 'chart-standard-pink',
              value: 'var(--chart-standard-pink)',
            },
            {
              name: 'chart-dark-1-pink',
              value: 'var(--chart-dark-1-pink)',
            },
            {
              name: 'chart-dark-2-pink',
              value: 'var(--chart-dark-2-pink)',
            },
            {
              name: 'chart-dark-3-pink',
              value: 'var(--chart-dark-3-pink)',
            },
            {
              name: 'chart-dark-4-pink',
              value: 'var(--chart-dark-4-pink)',
            },
            {
              name: 'chart-dark-5-pink',
              value: 'var(--chart-dark-5-pink)',
            },
          ],
        },
        {
          groupName: 'Orange',
          colors: [
            {
              name: 'chart-light-6-orange',
              value: 'var(--chart-light-6-orange)',
            },
            {
              name: 'chart-light-5-orange',
              value: 'var(--chart-light-5-orange)',
            },
            {
              name: 'chart-light-4-orange',
              value: 'var(--chart-light-4-orange)',
            },
            {
              name: 'chart-light-3-orange',
              value: 'var(--chart-light-3-orange)',
            },
            {
              name: 'chart-light-2-orange',
              value: 'var(--chart-light-2-orange)',
            },
            {
              name: 'chart-light-1-orange',
              value: 'var(--chart-light-1-orange)',
            },
            {
              name: 'chart-standard-orange',
              value: 'var(--chart-standard-orange)',
            },
            {
              name: 'chart-dark-1-orange',
              value: 'var(--chart-dark-1-orange)',
            },
            {
              name: 'chart-dark-2-orange',
              value: 'var(--chart-dark-2-orange)',
            },
            {
              name: 'chart-dark-3-orange',
              value: 'var(--chart-dark-3-orange)',
            },
            {
              name: 'chart-dark-4-orange',
              value: 'var(--chart-dark-4-orange)',
            },
            {
              name: 'chart-dark-5-orange',
              value: 'var(--chart-dark-5-orange)',
            },
          ],
        },
      ]}
    />
  )
}
Chart.parameters = {
  layout: 'left',
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
