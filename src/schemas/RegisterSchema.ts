import { object, ref, string } from 'yup'

const RegisterSchema = object({
  username: string().required('register.errorUsername'),
  email: string().required('register.requiredEmail').email('register.invalidEmail'),
  password: string().required('register.errorPassword').min(6, 'register.minPassword'),
  confirmPassword: string()
    .required('register.requiredConfirmPassword')
    .oneOf([ref('password'), ''], 'register.passwordsMustMatch')
})

export { RegisterSchema }
