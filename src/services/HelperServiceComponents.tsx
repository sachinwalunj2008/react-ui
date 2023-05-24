import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { PrintDialogIframeLoader } from '../module'

const { render } = ReactDOM

export const iframePrintDialog = (blob: Blob, callback?: () => void): void => {
  const file = new Blob([blob], {
    type: 'application/pdf',
  })
  //Build a URL from the file
  const fileURL = URL.createObjectURL(file)
  render(
    <PrintDialogIframeLoader file={fileURL} />,
    document.getElementById('pdfcontainer')
  )
  callback?.()
}
