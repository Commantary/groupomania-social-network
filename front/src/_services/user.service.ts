import Axios from './caller.service'

const getUserByUuid = (uuid: string) => {
  return Axios.get(`/api/v1/users/${uuid}`)
}

export const userService = {
  getUserByUuid,
}
