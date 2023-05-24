import * as React from 'react'

/**
 * @deprecated Please do not use this
 **/
type ConditionalWrapperProps = {
  condition: unknown
  wrapper: (children: React.ReactNode) => JSX.Element
  children: React.ReactNode
}
export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps): JSX.Element {
  return <>{condition ? wrapper(children) : children}</>
}
