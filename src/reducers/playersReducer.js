import { createSlice } from '@reduxjs/toolkit'
import playerService from '../services/players'

export const playersSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    setPlayers(state, action) {
      return action.payload
    },
    appendNew(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setPlayers, appendNew } = playersSlice.actions

//Thunk functions
export const initializePlayers = () => {
  return async (dispatch) => {
    const allPlayers = await playerService.getAll()
    dispatch(setPlayers(allPlayers))
  }
}

export const addPlayer = (credentials) => {
  return async (dispatch) => {
    try {
      const newPlayer = await playerService.createPlayer(credentials)
      dispatch(appendNew(newPlayer))
    } catch (err) {
      console.log(JSON.stringify(err.response.data))
      alert(JSON.stringify(err.response.data))
    }
  }
}

export default playersSlice.reducer
