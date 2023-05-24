import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import ProductImage from './ProductImage'

export default {
  title: 'Components/Image/ProductImage',
  component: ProductImage,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof ProductImage>

const Template: ComponentStory<typeof ProductImage> = (args) => (
  <ProductImage {...args} />
)

export const PatternLogo = Template.bind({})
PatternLogo.args = {
  alt: 'Pattern Logo',
  style: { width: '200px', height: '100px' },
  url: 'https://images.pattern.com/library/library-logo.svg',
}

export const NoImageUrl = Template.bind({})
NoImageUrl.args = {}

export const customNoImageSize = Template.bind({})
customNoImageSize.args = {
  iconSize: {
    height: '20px',
    width: '20px',
  },
}
