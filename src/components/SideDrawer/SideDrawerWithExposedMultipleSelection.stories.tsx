import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import {
  Button,
  SideDrawer,
  FormButtons,
  toast,
  MultipleSelection,
} from '../../module'

export default {
  title: 'Components/SideDrawer/Exposed MultipleSelection',
  component: SideDrawer,
  parameters: {
    docs: {
      page: () => (
        <DocsTemplate
          description={
            <span>
              The <code>SideDrawer</code> should be used to contain all forms
              that were previously handled in popovers. These drawers can be
              used for information, help, and will be in place of popovers that
              are otherwise too large to comfortably fit the screen.
            </span>
          }
          whenToUse={[
            'Many instances of forms that could comfortably fit in a drawer. These would not include very large forms that may need their own page.',
            'In mobile when the popover content cannot easily fit on the screen.',
          ]}
        />
      ),
    },
  },
} as ComponentMeta<typeof SideDrawer>

const PopoverTemplate: ComponentStory<typeof SideDrawer> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className='flex flex-direction-column align-items center'>
        <Button onClick={toggleDrawer}>Open Side Drawer</Button>
        {args.onlyMobile && (
          <div className='mt-8 fs-12'>
            Resize screen to a mobile view to see the drawer.
          </div>
        )}
      </div>
      <SideDrawer {...args} isOpen={isOpen} closeCallout={toggleDrawer}>
        {({ height }) =>
          args.children ? (
            typeof args.children === 'function' ? (
              args.children({ height })
            ) : (
              args.children
            )
          ) : (
            <p> Side Drawer Content Goes here</p>
          )
        }
      </SideDrawer>
    </>
  )
}

const resetButtonProps = {
    onClick: () => {
      toast({
        type: 'success',
        message: 'You clicked the Reset button!',
      })
    },
  },
  cancelButtonProps = {
    onClick: () => {
      toast({
        type: 'success',
        message: 'You clicked the Cancel button!',
      })
    },
  },
  saveButtonProps = {
    onClick: () => {
      toast({
        type: 'success',
        message: 'You clicked the Save button!',
      })
    },
  }

const ShowForm = ({
  selectedOptions,
  options,
  maxHeight,
}: {
  selectedOptions: Array<string>
  options: Array<string>
  maxHeight?: number | string
}): JSX.Element => {
  const [selected, setSelected] = useState(selectedOptions)

  return (
    <MultipleSelection
      selectedOptions={selected}
      options={options}
      callout={(selectedList) => {
        setSelected(selectedList)
      }}
      searchPlaceholder='Name'
      noListDataText='No Names Found'
      exposed
      maxHeight={maxHeight}
      labelText='Select a Name'
    />
  )
}

const options = [
  `D'Artagnan`,
  'Dave',
  'Ethan',
  'Gavin',
  'Jason',
  'Joe',
  'Josh',
  'Khayyam',
  'Matt',
  'Nate',
  'Russell',
]

const generateUniqueNames = () => {
  const names: Array<string> = []
  for (let i = 0; i < 50; i++) {
    const randomName = Math.floor(Math.random() * options.length)
    names.push(`#${i + 1} - ${options[randomName]}`)
  }
  return names
}

export const fewOptions = PopoverTemplate.bind({})
fewOptions.args = {
  headerContent: 'Exposed MultipleSelection',
  children: <ShowForm selectedOptions={[]} options={options.slice(0, 4)} />,
  footerContent: (
    <FormButtons
      resetButtonProps={resetButtonProps}
      cancelButtonProps={cancelButtonProps}
      saveButtonProps={{ ...saveButtonProps, children: 'Save Changes' }}
    />
  ),
}

export const manyOptions = PopoverTemplate.bind({})
manyOptions.args = {
  headerContent: 'Exposed MultipleSelection',
  children: <ShowForm selectedOptions={[]} options={options} />,
  footerContent: (
    <FormButtons
      resetButtonProps={resetButtonProps}
      cancelButtonProps={cancelButtonProps}
      saveButtonProps={{ ...saveButtonProps, children: 'Save Changes' }}
    />
  ),
}

export const manyOptionsWithMaxHeightOverride = PopoverTemplate.bind({})
manyOptionsWithMaxHeightOverride.args = {
  headerContent: 'Exposed MultipleSelection',
  children: ({ height }) => (
    <ShowForm
      selectedOptions={[]}
      options={generateUniqueNames()}
      maxHeight={height - 22} // 22px is the height of the label for the MultipleSelection
    />
  ),
  footerContent: (
    <FormButtons
      resetButtonProps={resetButtonProps}
      cancelButtonProps={cancelButtonProps}
      saveButtonProps={{ ...saveButtonProps, children: 'Save Changes' }}
    />
  ),
}
