import type { ViewUser } from '../models/ViewUser.model'

const getTimingFromDate = (date: any) => {
  // Return the date timing compared from the actual date
  const diff = Math.floor((+new Date() - date) / 1000)

  if (diff < 60)
    return 'maintenant'
  if (diff < 3600)
    return `${Math.floor(diff / 60)} min`
  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h`
  if (diff < 604800)
    return `${Math.floor(diff / 86400)} jour${Math.floor(diff / 86400) > 1 ? 's' : ''}`
  if (diff < 2629743)
    return `${Math.floor(diff / 604800)} semaine${Math.floor(diff / 604800) > 1 ? 's' : ''}`
  if (diff < 31556926)
    return `${Math.floor(diff / 2629743)} mois`
  return `${Math.floor(diff / 31556926)} année${Math.floor(diff / 31556926) > 1 ? 's' : ''}`
}

const getDateTranslation = (date: any) => {
  // Return the date in French
  const dateObject = new Date(date)
  const day = (dateObject.getDate()).toString().padStart(2, '0')
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObject.getFullYear()

  return `${day}/${month}/${year}`
}

const getUsername = (user: ViewUser) => {
  return `${user.first_name} ${user.last_name.charAt(0)}.`
}

export const commonService = {
  getTimingFromDate,
  getDateTranslation,
  getUsername,
}
