import { handleActions, combineActions } from 'redux-actions'

// Actions
import { setSceneSize, setCurrentKey } from './actions'

export default handleActions({
  [ combineActions(setSceneSize, setCurrentKey) ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, {})
