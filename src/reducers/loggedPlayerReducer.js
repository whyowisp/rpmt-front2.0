import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import playerService from '../services/players'

const initialState = null

export const playerSlice = createSlice({
  name: 'loggedPlayer',
  initialState,
  reducers: {
    setPlayer(state, action) {
      return action.payload
    },
    clearPlayer() {
      return initialState
    },
  },
})

export const { setPlayer, clearPlayer } = playerSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const player = await loginService.login(credentials)
      dispatch(setPlayer(player))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const setCurrentCampaign = (campaignId, playerId) => {
  const data = {
    currentCampaign: campaignId,
  }
  return async (dispatch) => {
    const player = await playerService.editPlayer(playerId, data)
    dispatch(setPlayer(player))
  }
}

export default playerSlice.reducer
