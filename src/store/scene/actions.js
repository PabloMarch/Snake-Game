import { createAction } from 'redux-actions'

// Data
import gameSetup from 'src/data/gameSetup'

// TEMP
const delay = ms => new Promise(resolve => setTimeout(() => resolve(gameSetup), ms));

// Actions
export const setSceneSize = createAction('SET_SCENE_SIZE')
export const setCurrentKey = createAction('SET_CURRENT_KEY')
export const setGameSettings = createAction('SET_GAME_SETTINGS')
export const pauseGame = createAction('PAUSE_GAME')

// Fetch vehicles
export const fetchGameSettings = () => async dispatch => {
  try {
    const response = await delay(0) // dispatch(Api.get('api/gameSettings')) // <= Simulate fetch
    dispatch(setGameSettings(response.gameSpec))
  } catch (err) {
    dispatch(setGameSettings(err))
  }
}
