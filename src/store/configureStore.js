import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from './reducers'

let middlewares = [
  reduxThunk
]

if (process.env.NODE_ENV !== 'prod') {
  middlewares = [ ...middlewares, createLogger ]
}

export default (initialState) => createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
)
