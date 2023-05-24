import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icon, { IconStringList } from './Icon'
import IconList from './iconsList'
import { DocsTemplate, CopyToClipBoard } from '../../../.storybook'

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const icon = Template.bind({})
icon.args = {
  icon: 'check',
  size: '40px',
}

export const AllIcons = (): JSX.Element => (
  <div className='flex align-items-center' style={{ flexWrap: 'wrap' }}>
    {Object.keys(IconList).map((icon) => {
      const iconName = icon as IconStringList
      return (
        <div
          className='flex align-items-center flex-direction-column'
          key={iconName}
          style={{
            padding: 5,
            minWidth: 200,
            marginBottom: 10,
            height: 60,
          }}
        >
          <CopyToClipBoard text={iconName}>
            <Icon
              icon={iconName}
              size={
                iconName === 'beta' || iconName === 'new'
                  ? { width: '40px', height: '20px' }
                  : '20px'
              }
            />
          </CopyToClipBoard>
          <div style={{ marginTop: 5 }}>{iconName}</div>
        </div>
      )
    })}
  </div>
)
