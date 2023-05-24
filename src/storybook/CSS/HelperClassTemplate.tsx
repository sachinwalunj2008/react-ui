import React from 'react'
import { Title, Primary } from '@storybook/addon-docs'
import { CopyToClipBoard } from '../../../.storybook'
import styles from './_helper-template.module.scss'

export const HelperClassTemplate = ({
  description,
}: {
  description?: React.ReactNode
}): JSX.Element => {
  return (
    <>
      <Title />
      {!!description && <p>{description}</p>}
      <Primary />
    </>
  )
}

type HelperClassExampleProps = {
  examples: {
    arr: { label: string; children: React.ReactNode; subtitle?: string }[]
    groupName: string
  }[]
  fonts?: boolean
  singleColumn?: boolean
}

export const HelperClassExample = ({
  examples,
  fonts,
  singleColumn,
}: HelperClassExampleProps): JSX.Element => {
  return (
    <div className={!singleColumn ? styles.grid : ''}>
      {examples.map((example, exampleIndex) => (
        <div key={example.groupName} className={!singleColumn ? 'mb-32' : ''}>
          {!singleColumn && <h4 className='mb-8'>{example.groupName}</h4>}
          {example.arr.map((a, exampleArrIndex) => {
            return (
              <div
                key={a.label}
                className={`${styles.row} ${
                  fonts ? styles.fonts : ''
                } fs-16 py-16 ${
                  (
                    singleColumn
                      ? exampleIndex < examples.length - 1
                      : exampleArrIndex < example.arr.length - 1
                  )
                    ? 'bdrb'
                    : ''
                } bdrc-light-gray`}
              >
                <CopyToClipBoard text={a.label} tooltipPosition='left'>
                  <span>
                    <p>{a.label}</p>
                    <span className='fs-10 fc-purple'>{a.subtitle}</span>
                  </span>
                </CopyToClipBoard>
                <span>{a.children}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
