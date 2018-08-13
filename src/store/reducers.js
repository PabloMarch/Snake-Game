import { combineReducers } from 'redux'

// Reducers

import scene from './scene'
import character from './character'

// Save a restarting point to reset game
let initialGameState = undefined

const initialGameReducer = combineReducers({
  scene,
  character
})

export default (state, action) => {
  if(action.type === 'SET_INITIAL_VALUES') {
    initialGameState = Object.assign({}, state, { character: action.payload })
  }
  else if(action.type === 'RESET_GAME') {
    initialGameState.scene.round = action.payload.round
    state = initialGameState
  }

  return initialGameReducer(state, action)
}
