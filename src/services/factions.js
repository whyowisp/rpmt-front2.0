import axios from 'axios'
const baseUrl = '/api/factions'

const getAllById = async (campaignId) => {
  const res = await axios.get(`${baseUrl}/byCampaignId/${campaignId}`)
  return res.data
}

const createNew = async (faction) => {
  const res = await axios.post(baseUrl + '/new', faction)
  return res.data
}

const updateFaction = async (reqData, factionId) => {
  const res = await axios.put(`${baseUrl}/${factionId}`, reqData)
  return res.data
}

const deleteFaction = async (factionId) => {
  const res = await axios.delete(`${baseUrl}/${factionId}`, factionId)
  return res.data
}

const factionService = { getAllById, createNew, updateFaction, deleteFaction }

export default factionService
