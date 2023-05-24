import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import SingleCsv from './SingleCsv'

export default {
  title: 'Components/CSV/SingleCsv',
  component: SingleCsv,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate description='Styles are not encapsulated with this component. They rely on another component wrapper to display correctly. Needs updating.' />
      ),
    },
  },
} as ComponentMeta<typeof SingleCsv>

const Template: ComponentStory<typeof SingleCsv> = (args) => (
  <SingleCsv {...args} />
)

// Using an open source CSV download API for demo
const url = 'https://dl.dropboxusercontent.com/s/eui3rl43yf2m8nv/nuevo_test.csv'

export const apiGeneration = Template.bind({})
apiGeneration.args = {
  csv: {
    csvName: 'Spreadsheet Name',
    linkName: 'Link Name in App',
    csvFormat: {
      api: () =>
        fetch(url).then((response) => {
          return response.text()
        }),
      params: {},
    },
  },
}
apiGeneration.storyName = 'API Generated'

export const frontendGenerated = Template.bind({})
frontendGenerated.args = {
  csv: {
    csvName: 'Spreadsheet Name',
    linkName: 'Link Name in App',
    csvData: [],
  },
}
frontendGenerated.storyName = 'Frontend Generated'
