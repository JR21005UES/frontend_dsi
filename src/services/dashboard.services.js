import network from './network.services'

const getMenu = async () => {
  const response = await network.get('/menu/listar')
  return response
}

export default {
  getMenu,
}
