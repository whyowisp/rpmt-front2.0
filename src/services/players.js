import axios from 'axios'
const baseUrl = '/api/players'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createPlayer = async (credentials) => {
  const res = await axios.post(baseUrl + '/new', { credentials })
  return res.data
}

const editPlayer = async (playerId, reqData) => {
  const res = await axios.put(`${baseUrl}/${playerId}`, reqData)
  return res.data
}

const playerService = { getAll, createPlayer, editPlayer }

export default playerService
