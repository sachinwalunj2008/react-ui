import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../.storybook'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, SideDrawer, FormButtons, ToggleOptions } from '../../module'
import { breadcrumbNavigation, addNewBreadcrumb } from './BreadcrumbsService'
import NewBreadcrumbs from './NewBreadcrumbs'
import { NewBreadcrumbType } from './Common/BreadcrumbTypes'

export default {
  title: 'Components/Breadcrumbs/NewBreadcrumbs',
  component: NewBreadcrumbs,
  parameters: {
    docs: {
      page: () => <DocsTemplate />,
    },
  },
} as ComponentMeta<typeof NewBreadcrumbs>

const Template: ComponentStory<typeof NewBreadcrumbs> = (args) => {
  const [breadcrumbs, setBreadcrumbs] = useState(args.breadcrumbs),
    [isOpen, setIsOpen] = useState(false),
    location = useLocation(),
    navigate = useNavigate(),
    breadcrumbTypes = {
      standardBreadcrumb: {
        name: `Level ${breadcrumbs.length + 1}`,
        link: `/level-${breadcrumbs.length + 1}`,
      },
      tabBreadcrumb: {
        name: breadcrumbs[breadcrumbs.length - 1].name,
        link: `/new-link-${breadcrumbs.length + 1}`,
        changeType: 'tab',
      },
      rootLevelBreadcrumb: {
        name: `Level 1`,
        link: `/level-1`,
        changeType: 'rootLevel',
      },
    },
    breadcrumbOptions = [
      {
        id: 1,
        text: 'Standard',
        value: 'standardBreadcrumb',
      },
      {
        id: 2,
        text: 'Tab',
        value: 'tabBreadcrumb',
      },
      {
        id: 3,
        text: 'Root Level',
        value: 'rootLevelBreadcrumb',
      },
    ],
    [activeBreadcrumbOption, setActiveBreadcrumbOption] = useState(
      breadcrumbOptions[0]
    ),
    cancelButtonProps = {
      onClick: () => {
        setIsOpen(false)
      },
    },
    saveButtonProps = {
      onClick: () => {
        setBreadcrumbs(
          addNewBreadcrumb({
            breadcrumb: breadcrumbTypes[activeBreadcrumbOption.value],
            breadcrumbs,
          })
        )
        setIsOpen(false)
      },
      children: 'Add Breadcrumb',
    }

  const reset = () => {
    navigate(args.breadcrumbs[args.breadcrumbs.length - 1].link)
    setBreadcrumbs(args.breadcrumbs)
  }

  const updateSelected = (value: string) => {
    const activeOption = breadcrumbOptions.find((item) => item.value === value)
    setActiveBreadcrumbOption(activeOption || breadcrumbOptions[0])
  }

  const navCallout = (breadcrumb: NewBreadcrumbType) => {
    setBreadcrumbs(
      breadcrumbNavigation({
        breadcrumb,
        breadcrumbs,
      })
    )
  }

  useEffect(() => {
    if (breadcrumbs) {
      const index = breadcrumbs.findIndex(
        (crumb) => crumb.link === location.pathname
      )
      if (index >= 0) {
        setBreadcrumbs((prevBreadcrumbs) => {
          const newBreadcrumbs = prevBreadcrumbs.slice(0, index + 1)
          if (prevBreadcrumbs.length !== newBreadcrumbs.length) {
            return newBreadcrumbs
          }
          return prevBreadcrumbs
        })
      }
    }
  }, [breadcrumbs, location.pathname])

  return (
    <div className='flex flex-direction-column align-items-center gap-16'>
      <NewBreadcrumbs
        {...args}
        breadcrumbs={breadcrumbs}
        callout={navCallout}
      />
      <div className='flex gap-16'>
        <Button onClick={reset}>Reset Breadcrumbs</Button>
        <Button styleType='primary-green' onClick={() => setIsOpen(true)}>
          Add Breadcrumb
        </Button>
        <SideDrawer
          isOpen={isOpen}
          closeCallout={() => setIsOpen(false)}
          headerContent='Add A Breadcrumb'
          footerContent={
            <FormButtons
              cancelButtonProps={cancelButtonProps}
              saveButtonProps={saveButtonProps}
            />
          }
        >
          <ToggleOptions
            options={breadcrumbOptions}
            labelText='Breadcrumb Type'
            state={activeBreadcrumbOption}
            stateName='value'
            callout={(_, value) => updateSelected(value)}
          />
        </SideDrawer>
      </div>
    </div>
  )
}

export const basic = Template.bind({})
basic.args = {
  breadcrumbs: [
    {
      name: 'Level 1',
      link: '/level-1',
    },
    {
      name: 'Level 2',
      link: '/level-2',
    },
    {
      name: 'Level 3',
      link: '/level-3',
    },
  ],
}

export const manyBreadcrumbs = Template.bind({})
manyBreadcrumbs.args = {
  breadcrumbs: [
    {
      name: 'Level 1',
      link: '/level-1',
    },
    {
      name: 'Level 2',
      link: '/level-2',
    },
    {
      name: 'Level 3',
      link: '/level-3',
    },
    {
      name: 'Level 4',
      link: '/level-4',
    },
    {
      name: 'Level 5',
      link: '/level-5',
    },
  ],
}

export const longBreadcrumbName = Template.bind({})
longBreadcrumbName.args = {
  breadcrumbs: [
    {
      name: 'Level 1',
      link: '/level-1',
    },
    {
      name: 'Level 2 with a long breadcrumb name for testing purposes',
      link: '/level-2',
    },
    {
      name: 'Level 3',
      link: '/level-3',
    },
  ],
}

export const characterLimit = Template.bind({})
characterLimit.args = {
  breadcrumbs: [
    {
      name: 'Level 1 With a Longer Title',
      link: '/level-1',
    },
    {
      name: 'Level 2 with a long breadcrumb name for testing purposes',
      link: '/level-2',
    },
    {
      name: 'Level 3 With a Longer Title',
      link: '/level-3',
    },
  ],
  characterLimit: 12,
}
