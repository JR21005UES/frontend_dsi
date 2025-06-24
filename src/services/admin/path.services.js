import network from '../network.services'

const getPathById = async (id) => {
  return await network.get(`/rutas/${id}`)
}

const getPaths = async () => {
  return await network.get('/rutas')
}

const getPaginated = async (page, per_page, query) => {
  return await network.get('/rutas', {
    params: {
      page,
      per_page,
      name: query.trim(),
    },
  })
}

const postPath = async (path) => {
  return await network.post('/rutas', path)
}

const putPath = async (id, path) => {
  return await network.put(`/rutas/${id}`, path)
}

const deletePath = async (id) => {
  return await network.delete(`/rutas/${id}`)
}

export default {
  getPathById,
  getPaths,
  getPaginated,
  postPath,
  putPath,
  deletePath,
}
