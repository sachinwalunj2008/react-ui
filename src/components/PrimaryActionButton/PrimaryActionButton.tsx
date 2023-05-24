import Tippy, { TippyProps } from '@tippyjs/react'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../Button/Button'
import MenuButton from '../Button/MenuButton'
import SingleCsv from '../CsvExport/SingleCsv'
import Icon, { IconStringList } from '../Icons/Icon'
import styles from './_primary-action-button.module.scss'
import { TooltipProps } from '../Tooltip/Tooltip'
import ConfirmationPopoverContent from '../ConfirmationPopover/ConfirmationPopoverContent'
import { ConfigConfirmationItem } from '../ConfirmationPopover/PopoverWithConfirmation'

type ActionWithCSV = ActionBase & {
  /** Optional CSV action */
  csv: SingleCsvProps['csv']
  displayText?: never
  handleClick?: never
}

type ActionWithoutCSV = ActionBase & {
  csv?: never
  /** Text that will display as the button's text */
  displayText: string
  /** Click handler */
  handleClick: () => void
}

/** Each Action will correspond to a button on the popover */
type ActionBase = {
  /** Toggle for disabling the button */
  disabled?: boolean
  /** Icon string */
  icon: IconStringList
  /* Optional props for showing tooltip when button disabled*/
  tooltip?: Omit<TooltipProps, 'children'>
  /** Optional props for showing confirmation popover in secondary option */
  confirmation?: ConfigConfirmationItem
}

type Action = ActionWithCSV | ActionWithoutCSV

type SingleCsvProps = React.ComponentProps<typeof SingleCsv>

type PrimaryActionButtonProps = {
  /** The text that will render for the `MenuButton`'s `mainButtonText` prop or for the `Button`'s children. */
  buttonText: string
  /** Array of actions to display in the popover. Each action corresponds to a button. If this prop is not defined, then a `Button` will be displayed instead of the `MenuButton`. */
  actions?: Action[]
  /** Callout for the main action button */
  mainActionCallout: () => void
  /** Toggle to disable main button. */
  disableMainButton?: boolean
  /** Toggle to disable secondary action button */
  disableSecondaryButton?: boolean
  /** Allow main button to be Tippy popover*/
  mainButtonType?: 'popover' | 'link' | 'button' | 'externalLink'
  /** Display element in popover for main portion of button */
  children?: (close: { close: () => void }) => React.ReactNode
  /** Position of the tippy popover */
  tippyPlacement?: TippyProps['placement']
  /** Function that is called on blur of MenuButton */
  onClickOutside?: () => void
  /** Optional className for the action tippy container popover */
  mainButtonPopoverClassName?: string
  /** Optional props for showing tooltip when main Menu button disabled */
  mainButtonTooltip?: {
    tooltipContent: React.ReactNode
    position?: TippyProps['placement']
  }
  /** Optional props for showing confirmation */
  mainConfirmation?: {
    confirmation: ConfigConfirmationItem
  }
}
type secondaryConfirmType = {
  closeConfirmation: () => void
  confirmCallout?: () => void
  close?: () => void
  closePopover?: () => void
}
const PrimaryActionButton = ({
  buttonText,
  actions,
  disableMainButton,
  mainActionCallout,
  disableSecondaryButton,
  mainButtonType,
  children,
  tippyPlacement,
  onClickOutside,
  mainButtonPopoverClassName,
  mainButtonTooltip,
  mainConfirmation,
}: PrimaryActionButtonProps): JSX.Element => {
  const [showTippyPopover, setShowTippyPopover] = useState(false)
  const handleClick = (close: () => void, action: Action) => {
    !action.csv && action.handleClick()
    close()
  }

  const confirm = (close: () => void, callout?: () => void) => {
    close()
    callout?.()
  }

  const [confirmationData, setConfirmationData] = useState<Action | undefined>(
    undefined
  )

  const closePopover = () => {
    setShowTippyPopover(false)
    setConfirmationData(undefined)
  }

  const ButtonWrapper = (): JSX.Element => {
    return (
      <Button
        disabled={disableMainButton}
        onClick={() =>
          mainConfirmation?.confirmation
            ? setShowTippyPopover(true)
            : mainActionCallout()
        }
        styleType='primary-green'
      >
        {buttonText}
      </Button>
    )
  }

  const showConfirmation = (itemName?: Action) => {
    return setConfirmationData(itemName)
  }

  const closeConfirmation = () => {
    setConfirmationData(undefined)
  }

  const secondaryConfirm = ({
    closeConfirmation,
    confirmCallout,
    close,
    closePopover,
  }: secondaryConfirmType) => {
    closeConfirmation()
    confirmCallout?.()
    closePopover?.()
    close?.()
  }

  return createPortal(
    <div className={styles.primaryActionButton}>
      {!actions ? (
        <>
          {mainConfirmation?.confirmation ? (
            <Tippy
              placement='top'
              className={mainButtonPopoverClassName}
              interactive={true}
              duration={[300, 0]}
              appendTo={document.body}
              content={
                <ConfirmationPopoverContent
                  body={mainConfirmation?.confirmation.body}
                  header={mainConfirmation?.confirmation.header}
                  type={mainConfirmation?.confirmation.type ?? 'green'}
                  cancelCallout={closePopover}
                  confirmCallout={() =>
                    confirm(
                      closePopover,
                      mainConfirmation?.confirmation?.confirmCallout
                    )
                  }
                  confirmButtonText={
                    mainConfirmation?.confirmation.confirmButtonText
                  }
                />
              }
              visible={showTippyPopover}
              onClickOutside={closePopover}
            >
              <span>
                <ButtonWrapper />
              </span>
            </Tippy>
          ) : (
            <ButtonWrapper />
          )}
        </>
      ) : (
        <MenuButton
          {...(confirmationData
            ? {
                actionButtonClassName: mainButtonPopoverClassName,
                onClickOutside: closeConfirmation,
              }
            : {})}
          actionPopoverElement={({ close }) => (
            <div className={styles.popover}>
              {confirmationData ? (
                <ConfirmationPopoverContent
                  body={confirmationData?.confirmation?.body ?? ''}
                  header={confirmationData?.confirmation?.header ?? ''}
                  type={confirmationData?.confirmation?.type ?? 'green'}
                  cancelCallout={closeConfirmation}
                  confirmCallout={() =>
                    secondaryConfirm({
                      closeConfirmation: closeConfirmation,
                      closePopover: closePopover,
                      close: close,
                      confirmCallout:
                        confirmationData?.confirmation?.confirmCallout,
                    })
                  }
                  confirmButtonText={
                    confirmationData?.confirmation?.confirmButtonText
                  }
                />
              ) : (
                actions.map((action) => {
                  const tooltipProps = {
                    ...(action.tooltip && {
                      tooltip: {
                        tooltipContent: action.tooltip.tooltipContent,
                      },
                    }),
                  }
                  return (
                    <Button
                      as='unstyled'
                      key={action.displayText}
                      disabled={action.disabled}
                      onClick={() => {
                        action?.confirmation
                          ? showConfirmation(action)
                          : handleClick(close, action)
                        action.csv?.csvFormat?.api()
                        action.csv?.csvFormat?.callout?.()
                      }}
                      className={styles.actionRow}
                      {...tooltipProps}
                    >
                      <Icon
                        icon={action.icon}
                        size='14px'
                        customClass={
                          action.disabled
                            ? styles.iconMediumPurple
                            : styles.iconDarkPurple
                        }
                      />
                      {action.csv ? (
                        <SingleCsv
                          csv={action.csv}
                          key={action.csv.linkName}
                          close={close}
                          csvId={action.csv.linkName}
                          hideIcon
                        />
                      ) : (
                        <span>{action.displayText}</span>
                      )}
                    </Button>
                  )
                })
              )}
            </div>
          )}
          styleType='primary-green'
          mainButtonText={buttonText}
          {...(mainButtonType === 'popover' && children
            ? {
                mainButtonType: 'popover',
                children: children,
                tippyPlacement: tippyPlacement,
                onClickOutside: onClickOutside,
              }
            : {
                mainButtonAction: mainActionCallout,
              })}
          disabledMainButton={disableMainButton}
          disabledActionButton={disableSecondaryButton}
          mainButtonPopoverClassName={mainButtonPopoverClassName}
          mainButtonTooltip={mainButtonTooltip}
        />
      )}
    </div>,
    document.querySelector('body') as HTMLBodyElement
  )
}

export default PrimaryActionButton
