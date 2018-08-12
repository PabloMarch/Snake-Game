import { handleActions, combineActions } from 'redux-actions'

// Actions
import {
  setSceneSize,
  setCurrentKey,
  setGameSettings,
  pauseGame,
  moveOnDirection
} from './actions'

const actions = combineActions(
  setSceneSize,
  setCurrentKey,
  setGameSettings,
  pauseGame,
  moveOnDirection
)

const initialState = {
  isGamePaused: false,
  refX: 0,
  refY: 0
}

export default handleActions({
  [ actions ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, initialState)
