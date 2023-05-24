import React from 'react'

const copyToClipboard = (hex) => {
  let copyText = document.getElementById(hex).innerText
  let el = document.createElement('textarea')
  el.value = copyText
  el.setAttribute('readonly', '')
  el.style = { position: 'absolute', left: '-9999px' }
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  alert(`Copied ${copyText}`)
}

const ColorSwatch = ({ config }) => (
  <div
    className='color-swatch-group'
    onClick={() => {
      copyToClipboard(config.hex)
    }}
  >
    <div
      className={`color-swatch ${config.border ? 'has-border' : ''}`}
      style={{ background: config.hex }}
    />
    <span className='color-swatch-hex' id={config.hex}>
      {config.hex}
    </span>
  </div>
)

export default ColorSwatch
