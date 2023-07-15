import { IError } from '@models/Model'

interface ISignupReq {
  email: string
  password: string
}

interface IUser {
  email: string
  password: string
}

interface IEUser {
  data: unknown | null
  error: IError | null
}

export { ISignupReq, IUser, IEUser }
