import React from 'react'
import ColorSwatch from './ColorSwatch'

const ColorSwatches = ({ config }) => (
  <div className={`colors-section ${config.sectionClass}`}>
    <div className='color-swatch-section'>
      {config.colors.map((color, i) => (
        <ColorSwatch config={color} key={i} />
      ))}
    </div>
    <div className='description-text'>
      <h3>{config.title}</h3>
      <p>{config.description}</p>
    </div>
  </div>
)

export default ColorSwatches
