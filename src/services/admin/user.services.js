import network from '../network.services'

const getUserById = async (id) => {
  return await network.get(`/user/listar/${id}`)
}

const getUsers = async () => {
  return await network.get('/users')
}

const getPaginated = async (params) => {
  return await network.get('/user/listar', {
    params,
  })
}

const postUser = async (user) => {
  return await network.post('/user/crear', user)
}

const updateUser = async (id, user) => {
  return await network.put(`/user/actualizar/${id}`, user)
}

const deleteUser = async (id) => {
  return await network.delete(`/user/eliminar/${id}`)
}
const putUser = async (id, user) => {
  return await network.put(`/users/${id}`, user)
}

export default {
  getUserById,
  getUsers,
  getPaginated,
  postUser,
  updateUser,
  deleteUser,
  putUser,
}
