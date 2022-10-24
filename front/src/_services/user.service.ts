import Axios from './caller.service'
import { routesService } from './index'

const getUserByUuid = (uuid: string) => {
  return Axios.get(routesService.routes_api.user.replace(':uuid', uuid))
}

const getUserActivities = (uuid: string) => {
  return Axios.get(routesService.routes_api.activities.replace(':uuid', uuid))
}

const getUserInvitations = (uuid: string) => {
  return Axios.get(routesService.routes_api.invitations.replace(':uuid', uuid))
}

export const userService = {
  getUserByUuid,
  getUserActivities,
  getUserInvitations,
}
