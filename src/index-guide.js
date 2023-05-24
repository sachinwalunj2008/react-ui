import './set-public-path.js'
import React from 'react'
import App from './App'
import './scss/main.scss'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root'),
  root = createRoot(container)
root.render(<App />)
