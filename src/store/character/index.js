import { handleActions, combineActions } from 'redux-actions'

// Actions
import { setCharacterBlocks, updateCharacterBlocks, addBodyItem } from './actions'

const actions = combineActions(setCharacterBlocks, updateCharacterBlocks, addBodyItem)

const initialState = { body: [] }

export default handleActions({
  [ actions ]: (state, { payload }) => ({ ...state, ...payload })
}, initialState)
