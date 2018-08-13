import { handleActions, combineActions } from 'redux-actions'

// Actions
import { setInitialValues, updateCharacter, addBodyItem } from './actions'

const actions = combineActions(setInitialValues, updateCharacter, addBodyItem)

const initialState = { body: [] }

export default handleActions({
  [ actions ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, initialState)
