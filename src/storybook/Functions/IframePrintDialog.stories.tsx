import { ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { Button } from '../../components/Button/Button'
import { iframePrintDialog } from '../../module'

export const Example = (
  /** The blob that will be loaded into the iframe and into the print dialog */
  blob: Blob
): JSX.Element => {
  return (
    <>
      <Button
        onClick={() => {
          // TODO: get printing this blob to work properly within Storybook
          iframePrintDialog(blob, () => {
            alert(
              'This alert is triggered from the iframePrintDialog callback function. Normally a print dialog would also appear, but this is not currently working within Storybook'
            )
          })
        }}
      >
        Print
      </Button>
    </>
  )
}

Example.storyName = 'iframePrintDialog'
Example.args = {
  blob: new Blob(),
}

export default {
  title: 'Helper Functions/iframePrintDialog',
  component: Example,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      page: () => (
        <>
          <DocsTemplate
            code={`
            import { iframePrintDialog } from '@patterninc/react-ui'
            iframePrintDialog(blob)

            // with optional callback
            function callbackFunction() {
              console.log('callback function called')
            }
            iframePrintDialog(blob, callbackFunction)
            `}
            description={
              <>
                A function used to render a blob in an iframe to be shown in a
                print dialog. A div in the DOM with an id of{' '}
                <code>pdfcontainer</code> is required.
              </>
            }
            whenToUse={[
              <>
                <code>iframePrintDialog</code> is used to load a blob into a
                print dialog
              </>,
            ]}
          />
          <div id='pdfcontainer' />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
