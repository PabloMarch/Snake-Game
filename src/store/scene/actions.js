import { createAction } from 'redux-actions'

// Data
import gameSetup from 'src/data/gameSetup'

// TEMP
const delay = ms => new Promise(resolve => setTimeout(() => resolve(gameSetup), ms));

// Actions
export const setSceneSize = createAction('SET_SCENE_SIZE')
export const setCurrentKey = createAction('SET_CURRENT_KEY')
