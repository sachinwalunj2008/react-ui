import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tag, { tagColorList } from './Tag'
import { DocsTemplate } from '../../../.storybook'
import { replaceSymbol } from '../../module'

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Tag>

const SingleTemplate: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const single = SingleTemplate.bind({})
single.args = {
  children: 'Blue',
  color: 'blue',
}

const AllTemplate: ComponentStory<typeof Tag> = () => {
  return (
    <div
      className='flex align-items-center'
      style={{ flexWrap: 'wrap', gap: '16px' }}
    >
      {tagColorList.map((tagColor) => (
        <Tag color={tagColor} key={tagColor}>
          {replaceSymbol(tagColor, ' ', '-')}
        </Tag>
      ))}
    </div>
  )
}

export const allVariations = AllTemplate.bind({})
