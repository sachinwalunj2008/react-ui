import React from 'react'
import Mdash from './Mdash'

type MdashCheckProps = {
  children: React.ReactNode
  check: boolean
  customClass?: string
}

export default function MdashCheck({
  customClass = '',
  check,
  children,
}: MdashCheckProps): JSX.Element {
  return (
    <div className={customClass}>
      {check ? <span>{children}</span> : <Mdash />}
    </div>
  )
}
