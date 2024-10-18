import { createSlice } from '@reduxjs/toolkit'
import covenantService from '../services/covenants'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - characterInitialization is about to happen.

export const covenantSlice = createSlice({
  name: 'covenants',
  initialState: [],
  reducers: {
    covenantInitialization(state, action) {
      return action.payload
    },
    covenantCreation(state, action) {
      console.log(action.payload)
      state.push(action.payload)
    },
    covenantEdition(state, action) {
      console.log(action.payload.content)
      const id = action.payload.id
      const content = action.payload.content

      const covenantInEdit = state.find((covenant) => covenant.id === id)
      const editedCovenant = Object.assign(covenantInEdit, content)

      state.map((covenant) => (covenant.id !== id ? covenant : editedCovenant))
    },
    laboratoryEdition(state, action) {
      const id = action.payload.id
      const labId = action.payload.labId
      const content = action.payload.content
      const labInEdit = state
        .find((covenant) => covenant.id === id)
        .laboratories.find((lab) => lab._id === labId)
      const editedLab = Object.assign(labInEdit, content)
      state
        .find((covenant) => covenant.id === id)
        .laboratories.map((lab) => (lab._id === labId ? editedLab : lab))
    },
    yearlySummaryEdition(state, action) {
      const id = action.payload.id
      const summaryId = action.payload.summaryId
      const content = action.payload.content
      const summaryInEdit = state
        .find((covenant) => covenant.id === id)
        .yearlySummaries.find((summary) => summary._id === summaryId)
      const editedSummary = Object.assign(summaryInEdit, content)
      state
        .find((covenant) => covenant.id === id)
        .yearlySummaries.map((summary) =>
          summary._id === summaryId ? editedSummary : summary
        )
    },
    covenantRemoval(state, action) {
      const id = action.payload
      return state.filter((covenant) => covenant.id !== id)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  covenantInitialization,
  covenantEdition,
  laboratoryEdition,
  yearlySummaryEdition,
  covenantCreation,
  covenantRemoval,
} = covenantSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initCovenants = (campaignId) => {
  return async (dispatch) => {
    const covenantsFromDb = await covenantService.getAll(campaignId)
    dispatch(covenantInitialization(covenantsFromDb))
  }
}

export const createNewCovenant = (covenant) => {
  console.log(covenant)
  return async (dispatch) => {
    const newCovenant = await covenantService.createNew(covenant)
    dispatch(covenantCreation(newCovenant))
  }
}
/*
Pass data to this function:
Use format:

{
  id: <covenantId>,
  content: {<theData>}
}
*/
export const editCovenant = (data) => {
  return async (dispatch) => {
    dispatch(covenantEdition(data))
    await covenantService.updateCovenant(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

/*
Pass data to this function:
Use format:

{
  id: <covenantId>,
  index: <labIndex>
  content: {<theData>}
}
*/
export const editLaboratories = (data) => {
  console.log(data)
  return async (dispatch) => {
    dispatch(laboratoryEdition(data))
    await covenantService.updateLaboratory(data.content, data.id, data.labId)
  }
}

/*
Pass data to this function:
Use format:

{
  id: <covenantId>,
  index: <summaryIndex>
  content: {<theData>}
}
*/
export const editYearlySummaries = (data) => {
  console.log(data)
  return async (dispatch) => {
    dispatch(yearlySummaryEdition(data))
    await covenantService.updateYearlySummary(
      data.content,
      data.id,
      data.summaryId
    )
  }
}

export const removeCovenant = (id) => {
  console.log(id)
  return async (dispatch) => {
    dispatch(covenantRemoval(id))
    await covenantService.deleteCovenant(id)
  }
}

// *** END OF THUNK FUNCTIONS ***

export default covenantSlice.reducer
