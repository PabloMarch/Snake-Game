import { handleActions, combineActions } from 'redux-actions'

// Actions
import { setSceneSize, setCurrentKey, setGameSettings, pauseGame } from './actions'

const actions = combineActions(setSceneSize, setCurrentKey, setGameSettings, pauseGame)

// default state
const defaultState = {
  isGamePaused: false
}

export default handleActions({
  [ actions ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, defaultState)
