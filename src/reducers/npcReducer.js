import { createSlice } from '@reduxjs/toolkit'
import npcService from '../services/npcs'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - npcInitialization is about to happen.

export const npcsSlice = createSlice({
  name: 'npcs',
  initialState: [],
  reducers: {
    npcsInitialization(state, action) {
      return action.payload
    },
    npcCreation(state, action) {
      state.push(action.payload)
    },
    npcEdition(state, action) {
      console.log(action.payload.content)
      const id = action.payload.id
      const content = action.payload.content

      const npcInEdit = state.find((npc) => npc._id === id)
      const editedNpc = Object.assign(npcInEdit, content)

      state.map((npc) => (npc._id !== id ? npc : editedNpc))
    },
    npcRemoval(state, action) {
      const id = action.payload
      return state.filter((npc) => npc._id !== id)
    },
  },
})

// Action creators are generated for each case reducer function
export const { npcsInitialization, npcEdition, npcCreation, npcRemoval } =
  npcsSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initNpcs = (campaignId) => {
  return async (dispatch) => {
    const npcsFromDb = await npcService.getAllById(campaignId)
    dispatch(npcsInitialization(npcsFromDb))
  }
}

//This function creates new npc with empty data
export const initializeNew = (userId, campaignId, isCreature) => {
  console.log(userId + ' ja ' + campaignId + ' ja ' + isCreature)
  return async (dispatch) => {
    const newNpc = await npcService.initNewNpc(userId, campaignId, isCreature)
    dispatch(npcCreation(newNpc))
  }
}

//This function creates new npc with existing npc object
export const initializeNewFromExisting = (userId, campaignId, npc) => {
  console.log(userId + ' ja ' + campaignId + ' ja ' + npc)
  return async (dispatch) => {
    const newNpc = await npcService.initNewNpcFromExisting(
      userId,
      campaignId,
      npc
    )
    console.log('newNpc: ', newNpc)
    dispatch(npcCreation(newNpc))
  }
}

/*
Pass data to this function:
Use format:

{
  id: <npcId>,
  content: {<theData>}
}
*/
export const editNpc = (data) => {
  console.log(data)
  return async (dispatch) => {
    dispatch(npcEdition(data))
    await npcService.updateNpc(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

export const deleteOne = (id) => {
  console.log('id: ' + id)
  return async (dispatch) => {
    dispatch(npcRemoval(id))
    await npcService.deleteNpc(id)
  }
}

// *** END OF THUNK FUNCTIONS ***

export default npcsSlice.reducer
