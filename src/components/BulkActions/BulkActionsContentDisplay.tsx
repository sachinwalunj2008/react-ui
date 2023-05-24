import React from 'react'
import { usePopoverAndMobileDrawer } from '../../module'

export type BulkActionsDispayContentProps = {
  children: (params: { closeMenu: () => void }) => void
}

const CustomDisplayContent = ({
  children,
}: BulkActionsDispayContentProps): JSX.Element => {
  const { closePopoverOrDrawer } = usePopoverAndMobileDrawer()
  return <>{children({ closeMenu: closePopoverOrDrawer })}</>
}

export default CustomDisplayContent
