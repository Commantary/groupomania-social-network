const settings_page = {
  actual: 'Mot de passe actuel',
  new: 'Nouveau mot de passe',
  confirm: 'Confirmer le nouveau mot de passe',
  button: 'Changer le mot de passe',

  error: {
    password: 'Le mot de passe doit contenir au moins 8 caractères',
    confirm: 'Les mots de passe ne correspondent pas',
    current: 'Le mot de passe actuel est manquant',
  },
}

const signup_page = {
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'Email',
  password: 'Mot de passe',

  error: {
    firstName: 'Veuillez entrer un prénom valide.',
    lastName: 'Veuillez entrer un nom valide.',
    email: 'Veuillez entrer une adresse email valide.',
    password: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
}

export const textService = {
  settings_page,
  signup_page,
}
