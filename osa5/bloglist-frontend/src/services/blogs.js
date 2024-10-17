import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.data
}

const deleteBlog = async deletableObject => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${deletableObject.id}`, config)
    return response
  } catch (error) {
    return error
  }
}

export default { getAll,create,updateLikes,deleteBlog,setToken }