import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { Button, debounce } from '../../module'
import { DocsTemplate } from '../../../.storybook'

export const Example = (): JSX.Element => {
  const [random, setRandom] = React.useState<number>(0)
  const newNumber = () => {
    const newNumber = Math.round(Math.random() * 100)
    setRandom(newNumber)
  }

  return (
    <>
      <div className='pb-16 fs-12'>
        There is a delay of 500ms after each button click
      </div>
      <Button
        as='button'
        styleType='primary-blue'
        onClick={debounce(newNumber, 500)}
      >
        Random Number
      </Button>
      <span className='pl-16'>{random}</span>
    </>
  )
}
Example.storyName = 'debounce'

export default {
  title: 'Helper Functions/debounce',
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
              import {debounce} from '@patterninc/react-ui'

              const yourDelay = 500
              const anyFunction = () => {return doesSomething()}

              debounce(anyFunction, yourDelay)
              // or
              debounce(() => {yourDelayedFunction()}, 500)
            `}
            description="Debounce is a function that delays a function's execution until after a specified amount of time has passed since the last time it was invoked. It accepts two parameters: the function to debounce and the number of milliseconds to delay the function for."
            whenToUse={[
              <span key='first-line'>
                <code>debounce</code> is used to prevent the function from being
                called too frequently, which can cause performance issues.
              </span>,
            ]}
            noArgs
          />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Example>
