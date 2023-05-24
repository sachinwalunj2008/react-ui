import React from 'react'
import { Alert } from '../module'

// NOTE: This is only used for the cleanup of react-ui. Not meant for other projects so we will not add this to module.ts
const DeprecationAlert = (): JSX.Element => {
  return (
    <Alert
      text='These docs are outdated. Updated designs and documentation will be coming.'
      type='info'
      customClass='mb-20'
    />
  )
}

export default DeprecationAlert
