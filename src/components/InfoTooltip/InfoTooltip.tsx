import React from 'react'
import { Icon, Tooltip } from '../../module'
import type { TooltipProps } from '../Tooltip/Tooltip'
import styles from './_info-tooltip.module.scss'

export type InfoTooltipProps = {
  /** The title displayed inside the tooltip */
  title: string | React.ReactNode
  /** The text or element displayed inside the tooltip */
  text: string[] | React.ReactNode
  /** Optional image to display inside the tooltip */
  image?: string
  /** Optional className for the tooltip */
  customClass?: string
  /** Optionally replace the content inside the tooltip - probably should not use this. Will likely deprecate this. */
  customNode?: React.ReactNode
  /** Determines the position of the tooltip */
  position?: TooltipProps['position']
  /** Optional className inside the tooltip */
  tooltipCustomClass?: TooltipProps['customClass']
  /** Optionally add other Tippy props */
  extraProps?: TooltipProps['extraProps']
  /** Optionally change the size of the tooltip */
  size?: 'standard' | 'xs' | 'sm'
  /** Option to add a maximum width for the tooltip */
  maxWidth?: TooltipProps['maxWidth']
  /** Optionally use SideDrawer when in a mobile view */
  useSideDrawerForMobile?: TooltipProps['useSideDrawerForMobile']
}

const InfoTooltip = ({
  image,
  title,
  text,
  position,
  customClass = '',
  customNode,
  tooltipCustomClass = '',
  extraProps,
  size = 'standard',
  maxWidth = 'auto',
  useSideDrawerForMobile,
}: InfoTooltipProps): JSX.Element => {
  return (
    <div className={customClass}>
      <Tooltip
        tooltipContent={
          <>
            {customNode ? (
              customNode
            ) : (
              <div
                className={`${styles.infoTooltipContent} ${
                  image ? styles.withImage : ''
                }`}
              >
                {image && <img src={image} alt='Tooltip Icon' />}
                <div>
                  <h3>{title}</h3>
                  {Array.isArray(text) ? (
                    text.map((e, i) => <p key={i}>{e}</p>)
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              </div>
            )}
          </>
        }
        useSideDrawerForMobile={useSideDrawerForMobile}
        extraProps={extraProps}
        position={position ? position : 'left'}
        customClass={tooltipCustomClass}
        maxWidth={maxWidth}
      >
        <Icon icon='info' customClass={`${styles.infoIcon} ${styles[size]}`} />
      </Tooltip>
    </div>
  )
}

export default InfoTooltip
