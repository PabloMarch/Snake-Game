import { handleActions, combineActions } from 'redux-actions'

// Actions
import * as actions from './actions'

const combinedActions = combineActions(
  actions.setSceneSize,
  actions.setCurrentKey,
  actions.setGameSettings,
  actions.pauseGame,
  actions.updateRefPosition,
  actions.incrementScore
)

const initialState = {
  currentKey: 'ArrowRight',
  isGamePaused: true,
  score: 0,
  round: 1,
  refX: 0,
  refY: 0
}

export default handleActions({
  [ combinedActions ]: (state, { payload }) => ({ ...state, ...payload })
}, initialState)
