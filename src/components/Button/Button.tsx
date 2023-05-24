import * as React from 'react'
import { Tooltip } from '../../module'
import { Link, LinkProps } from 'react-router-dom'
import styles from './_button.module.scss'
import { TooltipProps } from '../Tooltip/Tooltip'

type BaseProps = {
  /** Content inside of the Button */
  children: React.ReactNode
  /** Optional class for the Button */
  className?: string
  /** Style of the Button */
  styleType?:
    | 'primary-red'
    | 'primary-green'
    | 'primary-blue'
    | 'secondary'
    | 'tertiary'
    | 'text-red'
    | 'text-blue'
    | 'small'
  /** Optional prop for disabling button */
  disabled?: boolean
  /* Optional prop for showing toolip when button disabled*/
  tooltip?: Omit<TooltipProps, 'children'>
}

type ButtonAsButton = BaseProps &
  Omit<JSX.IntrinsicElements['button'], keyof BaseProps> & {
    /** Type of Button */
    as?: 'button'
  }

type ButtonAsUnstyled = Omit<ButtonAsButton, 'as' | 'styleType'> & {
  /** Type of Button */
  as: 'unstyled'
  styleType?: BaseProps['styleType']
}

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    /** Type of Button */
    as: 'link'
  }

type ButtonAsExternal = BaseProps &
  Omit<JSX.IntrinsicElements['a'], keyof BaseProps> & {
    /** Type of Button */
    as: 'externalLink'
  }

export type ButtonProps =
  | ButtonAsButton
  | ButtonAsExternal
  | ButtonAsLink
  | ButtonAsUnstyled

export function Button({
  as = 'button',
  className = '',
  styleType = 'secondary',
  disabled = false,
  tooltip,
  ...rest
}: ButtonProps): JSX.Element {
  const notPrimary = !styleType.includes('primary'),
    allClassNames = `${styles[styleType]} ${styles.button} ${
      notPrimary ? styles.nonPrimaryFont : styles.primaryFont
    } ${className}`

  const renderComponentWithTooltip = (children: React.ReactNode) => (
    <Tooltip
      tooltipContent={tooltip?.tooltipContent}
      position={tooltip?.position ?? 'bottom'}
    >
      {children}
    </Tooltip>
  )

  if (as === 'link' && isLinkProps(rest)) {
    return (
      <>
        {tooltip?.tooltipContent && disabled ? (
          renderComponentWithTooltip(
            <Link
              className={`${styles.button} ${allClassNames} ${styles.link} ${styles.disabled}`}
              // TS is expecting rest to be LinkProps and so are we since this is a Link
              {...(rest as LinkProps)}
            />
          )
        ) : (
          <Link
            className={`${styles.button} ${allClassNames} ${styles.link}`}
            // TS is expecting rest to be LinkProps and so are we since this is a Link
            {...(rest as LinkProps)}
          />
        )}
      </>
    )
  } else if (as === 'externalLink' && isAnchorProps(rest)) {
    return (
      <>
        {tooltip?.tooltipContent && disabled ? (
          renderComponentWithTooltip(
            <a
              className={`${styles.button} ${allClassNames} ${styles.link} ${styles.disabled}`}
              // provide good + secure defaults while still allowing them to be overwritten
              target='_blank'
              rel='noopener noreferrer'
              {...rest}
            >
              {rest.children}
            </a>
          )
        ) : (
          <a
            className={`${styles.button} ${allClassNames} ${styles.link}`}
            // provide good + secure defaults while still allowing them to be overwritten
            target='_blank'
            rel='noopener noreferrer'
            disabled={disabled}
            {...rest}
          >
            {rest.children}
          </a>
        )}
      </>
    )
  } else if (as === 'unstyled' && isButtonProps(rest)) {
    return (
      <>
        {tooltip?.tooltipContent && disabled ? (
          renderComponentWithTooltip(
            <button
              className={`${styles.button} ${allClassNames} ${styles.unstyled} ${styles.disabled}`}
              {...rest}
            />
          )
        ) : (
          <button
            className={`${styles.button} ${styles.unstyled} ${className}`}
            disabled={disabled}
            {...rest}
          />
        )}
      </>
    )
  } else if (isButtonProps(rest)) {
    return (
      <>
        {tooltip?.tooltipContent && disabled ? (
          renderComponentWithTooltip(
            <button
              className={`${styles.button} ${allClassNames} ${styles.disabled}`}
              {...rest}
            />
          )
        ) : (
          <button
            disabled={disabled}
            className={`${styles.button} ${allClassNames}`}
            {...rest}
          />
        )}
      </>
    )
  }

  throw new Error('could not determine the correct button type')
}

type OmitFromTypes = 'className' | 'styleType' | 'as'

function isLinkProps(
  maybeLinkProps: unknown
): maybeLinkProps is Omit<ButtonAsLink, OmitFromTypes> {
  if (
    typeof maybeLinkProps === 'object' &&
    maybeLinkProps !== null &&
    'to' in maybeLinkProps
  ) {
    return true
  }
  return false
}

function isButtonProps(
  maybeButtonProps: unknown
): maybeButtonProps is Omit<ButtonAsButton, OmitFromTypes> {
  return true
}

function isAnchorProps(
  maybeAnchorProps: unknown
): maybeAnchorProps is Omit<ButtonAsExternal, OmitFromTypes> {
  if (
    typeof maybeAnchorProps === 'object' &&
    maybeAnchorProps !== null &&
    'children' in maybeAnchorProps
  ) {
    return true
  }

  return false
}

// use cases / Examples
// uncomment to have a quick way to validate your types are working correctly

// function Test(): JSX.Element {
//   return (
//     <>
//       <Button
//         as='link'
//         // 'to' is required since it's required in the Link component
//         to='/test'
//         styleType='primary-green'
//         onClick={(evt) => {
//           // evt should be of type React.MouseEvent<HTMLAnchorElement, MouseEvent>
//           console.log(evt)
//         }}
//       >
//         hello!
//       </Button>
//       <Button
//         as='button'
//         styleType='primary-red'
//         onClick={(evt) => {
//           // evt should be of type React.MouseEvent<HTMLButtonElement, MouseEvent>
//           console.log(evt)
//         }}
//         // other button attributes should be allowed
//         type='button'
//       >
//         hello!
//       </Button>
//       <Button
//         as='externalLink'
//         styleType='tertiary'
//         onClick={(evt) => {
//           // evt should be of type React.MouseEvent<HTMLAnchorElement, MouseEvent>
//           console.log(evt)
//         }}
//         // href and other anchor attributes should be allowed
//         href='/someurl'
//         target='_blank'
//         rel='noopener'
//       >
//         hello!
//       </Button>
//       {/* unstyled buttons don't need a styleType since they're... unstyled. This is meant to help maintain correct HTML semantics / accessiblity */}
//       <Button as='unstyled'>Unstyled</Button>
//       <Button
//         // 'as' is optional, and will default to 'button'
//         styleType='secondary'
//         onClick={(evt) => {
//           // evt should be of type React.MouseEvent<HTMLButtonElement, MouseEvent>
//           console.log(evt)
//         }}
//       >
//         hello!
//       </Button>
//     </>
//   )
// }
