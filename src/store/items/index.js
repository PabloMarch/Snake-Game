import { handleActions } from 'redux-actions'

// Actions
import { setRandomItem } from './actions'

export default handleActions({
  [ setRandomItem ] (state, { payload }) {
    return { ...state, ...payload }
  }
}, {})
