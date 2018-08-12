import { handleActions, combineActions } from 'redux-actions'

// Actions
import { updateCharacter, addBodyItem } from './actions'

const actions = combineActions(updateCharacter, addBodyItem)

const initialState = { body: [] }

export default handleActions({
  [ actions ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, initialState)
