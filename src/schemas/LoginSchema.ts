import { object, string } from 'yup'

const LoginSchema = object({
  email: string().required('login.requiredEmail').email('login.invalidEmail'),
  password: string().required('login.errorPassword')
})

export { LoginSchema }
