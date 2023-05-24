import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import GuidedTour from './GuidedTour'
import { Icon, Tag, EmptyState, Button } from '../../module'

export default {
  title: 'Components/GuidedTour',
  component: GuidedTour,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='This component is to be used to introduce new features. It may also be used as an onboarding tool for an application.' />
      ),
    },
  },
} as ComponentMeta<typeof GuidedTour>

const Template: ComponentStory<typeof GuidedTour> = (args) => {
  const [show, setShow] = useState(false)

  const close = () => {
    setShow(false)
  }

  return (
    <div>
      <GuidedTour {...args} closeCallout={close} show={show} />
      {/* Trying to get wider content to test this with so adding the width */}
      <Button
        className='mb-16'
        styleType='primary-green'
        onClick={() => setShow(true)}
      >
        Start Tour
      </Button>
      <div style={{ width: '700px', maxWidth: '100%' }}>
        <div className='box flex justify-content-between mb-20'>
          <span>Page Header</span>
          <Icon icon='maleUser' customClass='guided-tour__maleUser-icon' />
        </div>
        <div className='flex gap-16'>
          <div className='flex gap-16 flex-direction-column'>
            <div>
              Here is some content that will not have a Guided tour associated
              with it.
            </div>

            <span className='fc-red flex align-items-center gap-8'>
              Some text to display{' '}
              <span className='guided-tour__tag'>
                <Tag color='red'>Pay Attention</Tag>
              </span>
            </span>
          </div>
          <div className='flex gap-16 flex-direction-column'>
            <span className='flex align-items-center gap-8'>
              Some text to display{' '}
              <Icon
                icon='info'
                customClass='svg-blue guided-tour__info-icon'
                size='14px'
              />
            </span>
            <div>
              Here is some content that will not have a Guided tour associated
              with it. Just a block of text here.
            </div>
            <div>
              Here is some content that will not have a Guided tour associated
              with it. Just a block of text here.
            </div>
            <div>
              Here is some content that will not have a Guided tour associated
              with it. Just a block of text here.
            </div>
            <span className='guided-tour__second-step'>
              <b>Second element to demo.</b>
            </span>
          </div>
        </div>
        <div className='flex justify-content-center mt-20'>
          <div style={{ width: '500px' }} className='guided-tour__empty-state'>
            <EmptyState
              primaryText='This is a Demo'
              secondaryText='Showing off the Guided Tour'
              background
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const guidedTour = Template.bind({})
guidedTour.args = {
  stepHeaderText: 'New Feature',
  steps: [
    {
      header: 'Attention Tag',
      body: 'This tag is the first element on the tour. We want to point it out because Tags are cool.',
      selector: '.guided-tour__tag',
    },
    {
      header: 'Line of Text',
      body: 'This is the text for the 2nd step. This is the text for the 2nd step. This is the text for the 2nd step. This is the text for the 2nd step. This is the text for the 2nd step. This is the text for the 2nd step.',
      selector: '.guided-tour__second-step',
    },
    {
      header: 'Informational Icon',
      body: 'This is the text for the info icon step on this tour. We will have some great stuff to say.',
      selector: '.guided-tour__info-icon',
    },
    {
      header: 'Some User Action',
      body: 'This is the text for the 4th step. This is the text for the 4th step. This is the text for the 4th step. This is the text for the 4th step.',
      selector: '.guided-tour__maleUser-icon',
    },
    {
      header: 'Empty State',
      body: 'This is the text the EmptyState component. We want to explain why this would be here.',
      selector: '.guided-tour__empty-state',
    },
  ],
}
