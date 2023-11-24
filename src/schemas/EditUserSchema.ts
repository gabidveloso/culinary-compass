import { object, string } from 'yup'

const EditUserSchema = object({
  username: string().required('myAccount.errorUsername'),
  email: string().email('myAccount.invalidEmail')
})

export { EditUserSchema }
