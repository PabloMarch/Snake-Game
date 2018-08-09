import { handleActions, combineActions } from 'redux-actions'

// Actions
import { addBodyItem } from './actions'

const actions = combineActions(addBodyItem)

// default state
const defaultState = {
  body: [
    { x: 0, y: 0, rotation: 0, type: 'body', icon: 'brightness_1' },
    { x: 24, y: 0, rotation: 0, type: 'body', icon: 'brightness_1' },
    { x: 48, y: 0, rotation: 0, type: 'body', icon: 'brightness_1' },
    { x: 72, y: 0, rotation: 0, type: 'head', icon: 'brightness_7' }
  ]
}

export default handleActions({
  [ actions ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, defaultState)
