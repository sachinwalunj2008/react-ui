import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import PrintDialogIframeLoader from './PrintDialogIframeLoader'

export default {
  title: 'Components/PrintDialogIframeLoader',
  component: PrintDialogIframeLoader,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description={
            <>
              Typically this component is not implemented on it's own, it's
              usually called through using the{' '}
              <span className='fw-bold'>iframePrintDialog</span> function, which
              allows it to be shown when you want explicity want it to appear
              (for example, after a button click). On it's own, it shows the
              print dialog immediately after the iframe finishes loading the
              given file src.
            </>
          }
        />
      ),
    },
  },
} as ComponentMeta<typeof PrintDialogIframeLoader>

const Template: ComponentStory<typeof PrintDialogIframeLoader> = (args) => (
  <PrintDialogIframeLoader {...args} />
)

export const defaultPrintDialogIframeLoader = Template.bind({})

defaultPrintDialogIframeLoader.storyName = 'Default'

defaultPrintDialogIframeLoader.args = {
  file: `iframe.html?id=components-icon--all-icons`,
}
