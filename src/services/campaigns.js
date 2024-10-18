import axios from 'axios'
const baseUrl = '/api/campaigns'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (campaign) => {
  const res = await axios.post(baseUrl + '/new', campaign)
  return res.data
}

const updateCampaign = async (reqData, campaignId) => {
  const res = await axios.put(`${baseUrl}/${campaignId}`, reqData)
  return res.data
}

const deleteCampaign = async (campaignId) => {
  const res = await axios.delete(`${baseUrl}/${campaignId}`, campaignId)
  return res.data
}

const campaignService = { getAll, createNew, updateCampaign, deleteCampaign }

export default campaignService
