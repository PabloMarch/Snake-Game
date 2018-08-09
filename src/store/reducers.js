import { combineReducers } from 'redux'

// Reducers

import scene from './scene'
import character from './character'

export default combineReducers({
  scene,
  character
})
