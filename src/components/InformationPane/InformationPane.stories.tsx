import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { InformationPane, toast, Button, Icon } from '../../module'
import { productData, otherData } from './information-pane-story-data'

export default {
  title: 'Components/InformationPane',
  component: InformationPane,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof InformationPane>

const Template: ComponentStory<typeof InformationPane> = (args) => (
  <div style={{ width: '300px' }}>
    <InformationPane {...args}>{args.children}</InformationPane>
  </div>
)

const BasicStructure = (
  <div>
    <InformationPane.ImageAndName
      imgUrl='https://m.media-amazon.com/images/I/41Jd5FzxAkL.SL500.jpg'
      product={{
        name: 'Product Name Here',
        url: 'https://www.amazon.com',
      }}
    />
    <InformationPane.Divider />
    <InformationPane.Section data={productData} isTwoColumns />
    <InformationPane.Divider />
    <InformationPane.Section data={otherData} />
  </div>
)

const basicConfig = {
    labelAndData: {
      label: 'Storybook',
      data: 'InformationPane',
      check: true,
    },
    tag: {
      children: 'Story',
      color: 'green',
    },
    edit: () =>
      toast({
        type: 'success',
        message: 'You clicked the edit button',
      }),
    children: BasicStructure,
  },
  { labelAndData, tag, edit, children } = basicConfig

export const basic = Template.bind({})
basic.args = {
  header: {
    labelAndData: labelAndData,
    tag: tag,
  },
  children,
}

export const noHeaderTag = Template.bind({})
noHeaderTag.args = {
  header: {
    labelAndData: labelAndData,
  },
  children,
}

export const headerWithEdit = Template.bind({})
headerWithEdit.args = {
  header: {
    labelAndData: labelAndData,
    edit: edit,
  },
  children,
}

export const noHeader = Template.bind({})
noHeader.args = {
  children,
}

export const longProductName = Template.bind({})
longProductName.args = {
  header: {
    labelAndData: labelAndData,
    tag: tag,
  },
  children: (
    <div>
      <InformationPane.ImageAndName
        imgUrl='https://m.media-amazon.com/images/I/41Jd5FzxAkL.SL500.jpg'
        product={{
          name: 'Pure Encapsulations O.N.E. Multivitamin | Once Daily Multivitamin with Antioxidant Complex Metafolin, CoQ10, and Lutein to Support Vision, Cognitive Function, and Cellular Health* | 120 Capsules',
          url: 'https://www.amazon.com',
        }}
      />
      <InformationPane.Divider />
      <InformationPane.Section data={productData} isTwoColumns />
      <InformationPane.Divider />
      <InformationPane.Section data={otherData} />
    </div>
  ),
}

export const noProductLink = Template.bind({})
noProductLink.args = {
  header: {
    labelAndData: labelAndData,
    tag: tag,
  },
  children: (
    <div>
      <InformationPane.ImageAndName
        imgUrl='https://m.media-amazon.com/images/I/41ZRl6RXeTS._SL75_.jpg'
        product={{
          name: 'Product Name Here',
        }}
      />
      <InformationPane.Divider />
      <InformationPane.Section data={productData} isTwoColumns />
    </div>
  ),
}

export const customSectionPlacement = Template.bind({})
customSectionPlacement.args = {
  header: {
    labelAndData: labelAndData,
    tag: tag,
  },
  children: (
    <div>
      <InformationPane.Section data={otherData} />
      <InformationPane.Divider />
      <InformationPane.Section data={productData} isTwoColumns />
      <InformationPane.Divider />
      <InformationPane.ImageAndName
        imgUrl='https://m.media-amazon.com/images/I/41ZRl6RXeTS._SL75_.jpg'
        product={{
          name: 'Product Name Here',
          url: 'https://www.amazon.com',
        }}
      />
    </div>
  ),
}

export const customSection = Template.bind({})
customSection.args = {
  header: {
    labelAndData: labelAndData,
    tag: tag,
  },
  children: (
    <div>
      <InformationPane.CustomSection>
        <span>Custom content would go here</span>
        <Button>Action</Button>
      </InformationPane.CustomSection>
      <InformationPane.Divider />
      <InformationPane.Section data={productData} isTwoColumns />
    </div>
  ),
}

export const offsetCustomSection = Template.bind({})
offsetCustomSection.args = {
  children: (
    <div>
      <InformationPane.CustomSection isOfffset>
        <div
          style={{ height: '50px', width: '50px', borderRadius: '100px' }}
          className='bgc-medium-blue p-16 flex justify-content-center'
        >
          <Icon icon='maleUser' customClass='svg-white' size='32px' />
        </div>
        <Button>Action</Button>
      </InformationPane.CustomSection>
      <InformationPane.Divider />
      <InformationPane.Section data={productData} isTwoColumns />
    </div>
  ),
}
