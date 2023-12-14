const home = {
  allRecipesBtn: 'Ver todas as receitas',
  getYourMenuBtn: 'Obter menu da semana',
  selectPreferencesBtn: 'Começa por seleccionar as tuas preferências',
  title: 'Menu Semanal',
  subTitle: 'Vamos tornar a tua vida mais fácil'
}

const header = {
  appName: 'Culinary Compass',
  logout: 'Terminar Sessão',
  modalTitle: 'Já de saída?',
  modalDescription: 'Tem a certeza que deseja terminar a sessão?',
  modalConfirm: 'Sim',
  modalCancel: 'Não',
  discovery: 'Descobrir'
}

const login = {
  title: 'Iniciar sessão',
  username: 'Nome de Utilizador',
  email: 'Email',
  password: 'Palavra-passe',
  submit: 'Entrar',
  requiredEmail: 'O campo de email é obrigatório',
  invalidEmail: 'Email inválido',
  errorPassword: 'Palavra-passe é obrigatório',
  placeholderUsername: 'nome de utilizador',
  placeholderPassword: 'palavra-passe',
  placeholderEmail: 'endereço de email',
  alreadyHaveAccount: 'Ainda não tem conta?',
  login: 'Carregue aqui para se registar',
  loginFailed: 'Login falhou'
}

const register = {
  title: 'Criar conta',
  username: 'Nome de Utilizador*',
  requiredConfirmPassword: 'Confirmar palavra-passe é obrigatório',
  passwordsMustMatch: 'As palavras-passe devem coincidir',
  email: 'Email*',
  password: 'Palavra-passe',
  confirmPassword: 'Confirmar palavra-passe',
  submit: 'Registar',
  errorUsername: 'Nome de Utilizador é obrigatório',
  errorPassword: 'Palavra-passe é obrigatória',
  minPassword: 'Palavra-passe deve ter pelo menos 6 caracteres',
  requiredEmail: 'Email é obrigatório',
  invalidEmail: 'Email inválido',
  placeholderUsername: 'nome de utilizador',
  placeholderPassword: 'palavra-passe',
  placeholderConfirmPassword: 'confirmar password',
  placeholderEmail: 'endereço de email',
  alreadyHaveAccount: 'Ja tem conta?',
  errorCreatingAccount: 'Erro ao criar conta'
}

const myAccount = {
  title: 'Conta de Utilizador',
  description: 'Edite os seus dados de utilizador',
  username: 'Nome de Utilizador*',
  email: 'Email',
  submit: 'Guardar',
  delete: 'Apagar',
  errorUsername: 'Nome de Utilizador é obrigatório',
  invalidEmail: 'Email invalido',
  warning:
    'Aviso: A alteração do endereço de email alterará as suas credenciais de login e irá terminar a sua sessão de utilizador.',
  usernameUpdated: 'Nome de Utilizador alterado com sucesso',
  usernameUpdatedError: 'Erro ao actualizar o nome de utilizador',
  emailUpdatedError: 'Erro a actualizar o email',
  cancel: 'Cancelar',
  changeEmail: 'Alterar Email',
  titleModal: 'Alterar Email',
  descriptionModal: 'Introduza a sua palavra-passe para confirmar a alteração de email',
  placeholderPassword: 'palavra-passe',
  password: 'Palavra-passe',
  loginError: 'Palavra-passe invalida',
  okay: 'Continuar',
  emailSent: 'Receberá um email para confirmar a alteração do email',
  placeholderEmail: 'endereço de email',
  placeholderUsername: 'nome de utilizador'
}

const discovery = {
  categoriesDescription: 'Selecione as categorias para mostrar:',
  titlejavascript: 'Top Javascript',
  titleBeef: 'Receitas de Bife',
  titleChicken: 'Receitas de Frango',
  titleDessert: 'Sobremesas',
  titleLamb: 'Receitas de borrego',
  titleMiscellaneous: 'Receitas Miscelaneas',
  titlePasta: 'Amantes de Massa',
  titlePork: 'Receitas de Porco',
  titleSeafood: 'Receitas de Mar',
  titleSide: 'Acompanhamentos',
  titleStarter: 'Entradas',
  titleVegan: 'Receitas Veganas',
  titleVegetarian: 'Receitas Vegetarianas',
  titleBreakfast: 'Pequeno Almoço',
  titleGoat: 'Receitas de cabra',
  emptyListTitle: 'Não há receitas para mostrar',
  emptyList: 'Não há receitas para mostrar, selecione algumas categorias',
  bookmarkedTitle: 'As minhas receitas favoritas',
  noBookmarks: 'Sem receitas favoritas',
  noBookmarksDescription: 'Seleccione receitas como favoritas para visualiza-las aqui'
}

const notFound = {
  title: 'Página nao encontrada',
  description: 'Esta página não foi encontrada. Por favor, volte para a página inicial.',
  goHome: 'Voltar para a página inicial'
}

const input = {
  showPassword: 'Mostrar',
  hidePassword: 'Ocultar'
}

export { home, header, login, input, register, myAccount, discovery, notFound }
