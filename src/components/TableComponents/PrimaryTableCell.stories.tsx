import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { DocsTemplate } from '../../../.storybook'
import PrimaryTableCell from './PrimaryTableCell'

export default {
  title: 'Components/Tables/Components/PrimaryTableCell',
  component: PrimaryTableCell,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='This component should always be shown in the first column of a table. It displays the product image, product name, ASIN, marketplace name and seller info. The product name and image are to be linked to the product details page. The Marketplace name is an external link (shown in blue) and will redirect users to the marketplace URL.' />
      ),
    },
  },
} as ComponentMeta<typeof PrimaryTableCell>

const Template: ComponentStory<typeof PrimaryTableCell> = (args) => (
  <PrimaryTableCell {...args} />
)

export const PrimaryCell = Template.bind({})
PrimaryCell.args = {
  sortBy: { prop: 'name', order: 'asc' },
  title: "Product's Name",
  uniqId: { id: '10001-A', idLabel: 'ASIN', idName: 'asin' },
  imageProps: {
    alt: 'Pattern Logo',
    style: { maxWidth: '40px' },
    url: 'https://m.media-amazon.com/images/I/41ZRl6RXeTS._SL75_.jpg',
  },
  marketplaceNames: ['Amazon', 'Amazon EU'],
  tags: [
    { children: 'blue', color: 'blue' },
    { children: 'yellow', color: 'yellow' },
    { children: 'red', color: 'red' },
    { children: 'purple', color: 'purple' },
  ],
  soldBy: { threepn: true, iserve: true },
}

export const WrappingTags = Template.bind({})
WrappingTags.args = {
  sortBy: { prop: 'name', order: 'asc' },
  title: "Product's Name",
  uniqId: { id: '10001-A', idLabel: 'ASIN', idName: 'asin' },
  imageProps: {
    alt: 'Pattern Logo',
    style: { maxWidth: '40px' },
    url: 'https://m.media-amazon.com/images/I/41ZRl6RXeTS._SL75_.jpg',
  },
  marketplaceNames: ['Amazon', 'Amazon EU'],
  tags: [
    { children: 'blue', color: 'blue' },
    { children: 'yellow', color: 'yellow' },
    { children: 'red', color: 'red' },
    { children: 'purple', color: 'purple' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
    { children: 'green', color: 'green' },
  ],
  soldBy: { threepn: true, iserve: true },
}

export const SimpleCellSortByNameNoImage = Template.bind({})
SimpleCellSortByNameNoImage.args = {
  sortBy: { prop: 'name', order: 'asc' },
  title: 'Simple Cell',
  uniqId: { id: 'aick-1030-skng', idLabel: 'ID', idName: 'id' },
  marketplaceNames: 'ebay',
  soldBy: { iserve: true },
}

export const CellWithInternalAndExternalLinks = Template.bind({})
CellWithInternalAndExternalLinks.args = {
  sortBy: { prop: 'data', order: 'asc' },
  title: 'Cell With Links',
  uniqId: { id: '1234567890', idLabel: 'ASIN', idName: 'asin' },
  imageProps: {
    alt: 'Pattern Logo',
    style: { maxWidth: '40px' },
    url: 'https://m.media-amazon.com/images/I/41ZRl6RXeTS._SL75_.jpg',
  },
  marketplaceNames: 'Amazon',
  externalLink: 'https://www.amazon.com',
  productLink: 'https://library.pattern.com/',
}

export const SortByIdAndLongTitle = Template.bind({})
SortByIdAndLongTitle.args = {
  sortBy: { prop: 'asin', order: 'asc' },
  title:
    'This is a product that has a very long title that just keeps going until you hit the character limit',
  uniqId: { id: '1234567890', idLabel: 'ASIN', idName: 'asin' },
  imageProps: {
    alt: 'Pattern Logo',
    style: { maxWidth: '40px' },
    url: 'https://m.media-amazon.com/images/I/41ZRl6RXeTS._SL75_.jpg',
  },
  marketplaceNames: 'Amazon',
  soldBy: { threepn: true },
}
