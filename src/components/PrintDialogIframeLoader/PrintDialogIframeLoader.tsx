import React, { useEffect, useRef } from 'react'

interface PrintDialogIframeLoaderProps {
  /** File to load into the print dialog */
  file: string
}

function PrintDialogIframeLoader({
  file,
}: PrintDialogIframeLoaderProps): JSX.Element {
  const timeoutRef = useRef<number>()

  const isLoaded = () => {
    const getMyFrame = document.getElementById('receipt') as HTMLIFrameElement
    getMyFrame?.focus()
    timeoutRef.current = window.setTimeout(() => {
      getMyFrame?.contentWindow?.print()
    }, 250)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <iframe
      id='receipt'
      src={file}
      style={{ visibility: 'hidden', width: 0, height: 0 }}
      title='Receipt'
      onLoad={isLoaded}
    />
  )
}

export default PrintDialogIframeLoader
