import network from '../network.services'

const getRoleById = async (id) => {
  return await network.get(`/perfiles/${id}`)
}

const getRoles = async () => {
  return await network.get('/perfiles')
}

const getPaginated = async (page, per_page, query) => {
  return await network.get('/perfiles', {
    params: {
      page,
      per_page,
      mane: query.trim(),
    },
  })
}

const postRole = async (role) => {
  return await network.post('/perfiles', role)
}

const putRole = async (id, role) => {
  return await network.put(`/perfiles/${id}`, role)
}

export default {
  getRoleById,
  getRoles,
  getPaginated,
  postRole,
  putRole,
}
