import { handleActions } from 'redux-actions'

// Actions
import { scene } from './actions'

export default handleActions({
  [scene] (state, { payload }) {
    return { ...state, ...payload }
  }
}, {})
