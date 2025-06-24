import network from '../network.services'

const getTipoPermission = async () => {
  return await network.get('/tipo/roles')
}

const getPermissionById = async (id) => {
  return await network.get(`/roles/${id}`)
}

const getPermissions = async () => {
  return await network.get('/roles')
}

const getPaginated = async (page, per_page, query) => {
  return await network.get('/roles', {
    params: {
      page,
      per_page,
      nombre: query.trim(),
    },
  })
}

const postPermission = async (permission) => {
  return await network.post('/roles', permission)
}

const updatePermission = async (id, permission) => {
  return await network.put(`/roles/${id}`, permission)
}

const deletePermission = async (id) => {
  return await network.delete(`/roles/${id}`)
}

export default {
  getTipoPermission,
  getPermissionById,
  getPermissions,
  getPaginated,
  postPermission,
  updatePermission,
  deletePermission,
}
