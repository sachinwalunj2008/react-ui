import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Pill, { pillColorList } from './Pill'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/Pill',
  component: Pill,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
    controls: { sort: 'requiredFirst' },
  },
} as ComponentMeta<typeof Pill>

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />

export const basic = Template.bind({})
basic.args = {
  color: 'red',
  number: 32,
}

const AllTemplate: ComponentStory<typeof Pill> = () => {
  return (
    <div
      className='flex align-items-center'
      style={{ flexWrap: 'wrap', gap: '16px' }}
    >
      {pillColorList.map((pillColor) => (
        <Pill color={pillColor} key={pillColor} number={32} />
      ))}
    </div>
  )
}

export const allVariations = AllTemplate.bind({})
