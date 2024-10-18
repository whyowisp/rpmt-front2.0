import { createSlice } from '@reduxjs/toolkit'
import charService from '../services/characters'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - characterInitialization is about to happen.

export const characterSlice = createSlice({
  name: 'characters',
  initialState: [],
  reducers: {
    charactersInitialization(state, action) {
      return action.payload
    },
    characterCreation(state, action) {
      state.push(action.payload)
    },
    characterEdition(state, action) {
      console.log(action.payload.content)
      const id = action.payload.id
      const content = action.payload.content

      const charInEdit = state.find((character) => character._id === id)
      const editedChar = Object.assign(charInEdit, content)

      state.map((character) => (character._id !== id ? character : editedChar))
    },
    characterRemoval(state, action) {
      const id = action.payload
      return state.filter((character) => character._id !== id)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  charactersInitialization,
  characterEdition,
  characterCreation,
  characterRemoval,
} = characterSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initCharacters = (campaignId) => {
  return async (dispatch) => {
    const charactersFromDb = await charService.getAllById(campaignId)
    dispatch(charactersInitialization(charactersFromDb))
  }
}

export const initializeNew = (userId, campaignId) => {
  console.log(userId + ' ja ' + campaignId)
  return async (dispatch) => {
    const newCharacter = await charService.initNewChar(userId, campaignId)
    dispatch(characterCreation(newCharacter))
  }
}
/*
Pass data to this function:
Use format:

{
  id: <characterId>,
  content: {<theData>}
}
*/
export const editCharacter = (data) => {
  return async (dispatch) => {
    dispatch(characterEdition(data))
    await charService.updateChar(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

export const deleteOne = (id) => {
  return async (dispatch) => {
    dispatch(characterRemoval(id))
    await charService.deleteChar(id)
  }
}

// *** END OF THUNK FUNCTIONS ***

export default characterSlice.reducer
