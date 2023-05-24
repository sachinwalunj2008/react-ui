import React from 'react'
import { CopyToClipBoard } from '../../../../../.storybook'
import { replaceSymbol } from '../../../../module'
import styles from './_color-palette.module.scss'

type ColorPaletteProps = {
  colorGroups: Array<{
    groupName: string
    colors: Array<{
      name: string
      value: string
      whiteFont?: boolean
      hasBorder?: boolean
    }>
  }>
}

const ColorPalette = ({ colorGroups }: ColorPaletteProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {colorGroups.map((group) => (
        <div key={group.groupName} className={styles.row}>
          {group.colors.map((color) => (
            <CopyToClipBoard key={color.name} text={color.value}>
              <div className='fs-12'>
                <div
                  className={`flex align-items-center justify-content-center ${
                    color.name.includes('dark') || color.whiteFont
                      ? 'fc-white'
                      : 'fc-dark-purple'
                  } ${color.hasBorder ? 'bdr bdrc-light-gray' : ''}`}
                  style={{
                    background: color.value,
                    width: '200px',
                    height: '200px',
                  }}
                />
                <div className='mt-4'>
                  {replaceSymbol(color.name, ' ', '-')}
                </div>
                <div className='fc-purple'>{color.value}</div>
              </div>
            </CopyToClipBoard>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ColorPalette
