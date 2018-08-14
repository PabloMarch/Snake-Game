import { combineReducers } from 'redux'

// Reducers

import scene from './scene'
import character from './character'
import item from './items'

// Save a restarting point to reset game
let initialGameState

const initialGameReducer = combineReducers({
  scene,
  character,
  item
})

export default (state, action) => {
  if(action.type === 'SET_CHARACTER_BLOCKS') {
    initialGameState = Object.assign({}, state, { character: action.payload })
  }
  else if(action.type === 'RESET_GAME') {
    initialGameState.scene.round = action.payload.round
    state = initialGameState
  }

  return initialGameReducer(state, action)
}
