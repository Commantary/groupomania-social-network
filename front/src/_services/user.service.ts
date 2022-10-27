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

const acceptInvitation = (uuid: string) => {
  const data = {
    type: '1',
  }

  return Axios.put(routesService.routes_api.invitations.replace(':uuid', uuid), data)
}

const rejectInvitation = (uuid: string) => {
  const data = {
    type: '-1',
  }

  return Axios.put(routesService.routes_api.invitations.replace(':uuid', uuid), data)
}

const sendInvitation = (uuid: string) => {
  const data = {
    type: '0',
  }

  return Axios.put(routesService.routes_api.invitations.replace(':uuid', uuid), data)
}

const deleteFriend = (uuid: string) => {
  return Axios.delete(routesService.routes_api.friend.replace(':uuid', uuid))
}

export const userService = {
  getUserByUuid,
  getUserActivities,
  getUserInvitations,
  acceptInvitation,
  rejectInvitation,
  sendInvitation,
  deleteFriend,
}
