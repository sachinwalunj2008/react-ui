import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CsvExport from './CsvExport'
import { DocsTemplate } from '../../../.storybook'

export default {
  title: 'Components/CSV/CsvExport',
  component: CsvExport,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof CsvExport>

const Template: ComponentStory<typeof CsvExport> = (args) => (
  <CsvExport {...args} />
)

const singleCsvDataDownloadOptions = [
    {
      linkName: 'CSV dataset 1',
      csvName: 'CSV dataset 1',
      hiddenClass: 'revandunits',
      csvData: [
        { Name: 'John Doe', Age: 33, Email: 'johndoe@pattern.com' },
        { Name: 'Jane Doe', Age: 31, Email: 'janedoe@pattern.com' },
        { Name: 'Tom', Age: 35, Email: 'tom@pattern.com' },
      ],
      callout: (element) => element.click(),
    },
  ],
  multiCsvDataDownloadOptions = [
    {
      linkName: 'CSV dataset 1',
      csvName: 'CSV dataset 1',
      hiddenClass: 'revandunits',
      csvData: [
        { Name: 'John Doe', Age: 33, Email: 'johndoe@pattern.com' },
        { Name: 'Jane Doe', Age: 31, Email: 'janedoe@pattern.com' },
        { Name: 'Tom', Age: 35, Email: 'tom@pattern.com' },
      ],
      callout: (element) => element.click(),
    },
    {
      linkName: 'CSV dataset 2',
      csvName: 'CSV dataset 2',
      hiddenClass: 'revandunits',
      csvData: [
        { Name: 'Jane Doe', Age: 31, Email: 'janedoe@pattern.com' },
        { Name: 'John Doe', Age: 33, Email: 'johndoe@pattern.com' },
        { Name: 'Tom', Age: 35, Email: 'tom@pattern.com' },
      ],
      callout: (element) => element.click(),
    },
  ]

// Using an open source CSV download API for demo
const url = 'https://dl.dropboxusercontent.com/s/eui3rl43yf2m8nv/nuevo_test.csv'

const singleCsvApiDownloadOptions = [
    {
      linkName: 'API Data 1',
      csvName: 'API Data 1',
      csvFormat: {
        api: () =>
          fetch(url).then((response) => {
            return response.text()
          }),
        params: {},
      },
    },
  ],
  multiCsvApiDownloadOptions = [
    {
      linkName: 'API Data 1',
      csvName: 'API Data 1',
      csvFormat: {
        api: () =>
          fetch(url).then((response) => {
            return response.text()
          }),
        params: {},
      },
    },
    {
      linkName: 'API Data 2',
      csvName: 'API Data 2',
      csvFormat: {
        api: () =>
          fetch(url).then((response) => {
            return response.text()
          }),
        params: {},
      },
    },
  ]

export const singleCsvDataDownload = Template.bind({})
singleCsvDataDownload.args = {
  csvDownloadOptions: singleCsvDataDownloadOptions,
  show: true,
  initialDisplay: true,
}
singleCsvDataDownload.storyName = 'Single Download Using JSON Data'

export const multipleCsvDataDownload = Template.bind({})
multipleCsvDataDownload.args = {
  csvDownloadOptions: multiCsvDataDownloadOptions,
  show: true,
  initialDisplay: true,
}
multipleCsvDataDownload.storyName = 'Multiple Download Using JSON Data'

export const singleCsvApiDownload = Template.bind({})
singleCsvApiDownload.args = {
  csvDownloadOptions: singleCsvApiDownloadOptions,
  show: true,
  initialDisplay: true,
}
singleCsvApiDownload.storyName = 'Single Download Using an API'

export const multipleCsvApiDownload = Template.bind({})
multipleCsvApiDownload.args = {
  csvDownloadOptions: multiCsvApiDownloadOptions,
  show: true,
  initialDisplay: true,
}
multipleCsvApiDownload.storyName = 'Multiple Download Using an API'
