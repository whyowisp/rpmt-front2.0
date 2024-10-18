import { createSlice } from '@reduxjs/toolkit'
import factionService from '../services/factions'
import { createNewCovenant } from './covenantReducer'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - factionInitialization is about to happen.

export const factionsSlice = createSlice({
  name: 'factions',
  initialState: [],
  reducers: {
    factionsInitialization(state, action) {
      return action.payload
    },
    factionCreation(state, action) {
      state.push(action.payload)
    },
    factionEdition(state, action) {
      const id = action.payload.id
      const content = action.payload.content
      const factionInEdit = state.find((faction) => faction.id === id)
      const editedFaction = Object.assign(factionInEdit, content)

      state.map((faction) => (faction.id !== id ? faction : editedFaction))
    },
    factionRemoval(state, action) {
      const id = action.payload
      return state.filter((faction) => faction.id !== id)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  factionsInitialization,
  factionEdition,
  factionCreation,
  factionRemoval,
} = factionsSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initFactions = (campaignId) => {
  return async (dispatch) => {
    const factionsFromDb = await factionService.getAllById(campaignId)
    dispatch(factionsInitialization(factionsFromDb))
  }
}

export const createFaction = (faction) => {
  return async (dispatch) => {
    const newFaction = await factionService.createNew(faction)
    dispatch(factionCreation(newFaction))

    //Create game specific faction types
    if (newFaction.factionType === 'covenant') {
      dispatch(createNewCovenant(newFaction.id))
    }
  }
}
/*
Pass data to this function:
Use format:

{
  id: <factionId>,
  content: {<theData>}
}
*/
export const editFaction = (data) => {
  return async (dispatch) => {
    dispatch(factionEdition(data))
    await factionService.updateFaction(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

export const removeFaction = (factionId) => {
  return async (dispatch) => {
    dispatch(factionRemoval(factionId))
    await factionService.deleteFaction(factionId)
  }
}

// *** END OF THUNK FUNCTIONS ***

export default factionsSlice.reducer
