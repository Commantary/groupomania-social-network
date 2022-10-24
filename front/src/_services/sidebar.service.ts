const items = [
  {
    icon: 'fa-solid fa-house',
    text: 'Accueil',
    to: '/',
    exact: true,
  },
  {
    icon: 'fa-solid fa-user',
    text: 'Mon profil',
    to: '/user/:id',
    exact: false,
  },
  {
    icon: 'fa-solid fa-scroll',
    text: 'Mes posts',
    to: '/my-posts',
    exact: false,
  },
  {
    icon: 'fa-solid fa-fire-flame-curved',
    text: 'Mes favoris',
    to: '/favorites',
    exact: false,
  },
  {
    icon: 'fa-solid fa-user-group',
    text: 'Invitations',
    to: '/invitations',
    exact: false,
  },
]

export const sidebarService = {
  items,
}
