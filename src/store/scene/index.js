import { handleActions, combineActions } from 'redux-actions'

// Actions
import {
  setSceneSize,
  setCurrentKey,
  setGameSettings,
  pauseGame,
  updateRefPosition,
  incrementScore
} from './actions'

const actions = combineActions(
  setSceneSize,
  setCurrentKey,
  setGameSettings,
  pauseGame,
  updateRefPosition,
  incrementScore
)

const initialState = {
  isGamePaused: false,
  score: 0,
  round: 1,
  refX: 0,
  refY: 0
}

export default handleActions({
  [ actions ]: (state, { payload }) => ({ ...state, ...payload })
}, initialState)
