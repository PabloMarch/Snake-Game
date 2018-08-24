import 'babel-polyfill'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import configureStore from './store/configureStore'

// Components
import Game from 'components/Game'

// Create Store
const store = configureStore()

// JSS configuration
const generateClassName = createGenerateClassName()
const jss = create(jssPreset())

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js'))
}

render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Game/>
    </JssProvider>
  </Provider>,
  document.getElementById('app')
)
