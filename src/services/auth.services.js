import network from './network.services'

const login = async(email, password) => {
  const response = await network.post('/login', {email, password})
  return response
}

const verify = async() => {
  const response = await network.get('/users/verify')
  return response
}

export default {
  login,
  verify,
}
