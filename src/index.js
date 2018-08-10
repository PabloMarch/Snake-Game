import 'babel-polyfill'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { create } from 'jss'
import jssCompose from 'jss-compose'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'

// Components
import Game from 'components/Game';

// Create Store
import configureStore from './store/configureStore'

const store = configureStore();

// JSS configuration.
const generateClassName = createGenerateClassName()
const jss = create({
  plugins: [
    ...jssPreset().plugins,
    jssCompose()
  ]
})

render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Game/>
    </JssProvider>
  </Provider>,
  document.getElementById('app')
);
