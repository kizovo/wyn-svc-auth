import * as dto from '@base/base.dto'

export interface IUser {
  id: string
  uuid: string
  email: string
  phone: string
  password: string
  firstName: string
  lastName: string
  basicId: string
  lastChangePassword: string
  lastLogin: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IDbFields {
  uuid: boolean
  email: boolean
  phone: boolean
  firstName: boolean
  lastName: boolean
}

export interface IListUserReq extends dto.IPaginationReq {
  search: string
  fields: string
}

export interface IDetailUserReq {
  uuid: string[]
}

export interface IDeleteUserReq {
  uuid: string[]
}

export interface ISignupReq {
  email: string
  password: string
  phone: string
  first_name: string
  last_name: string
}

export interface ISigninReq {
  email: string
  password: string
  phone: string
}

// mapping json to db fields
export const mapSignUpDb = (data: ISignupReq): Object => {
  return {
    email: data.email,
    phone: data.phone,
    password: data.password,
    firstName: data.first_name,
    lastName: data.last_name,
    basicId: data.email || data.phone ? true : false,
    lastChangePassword: new Date(),
  }
}

// mapping db fields to json
export const mapFieldToJson = (data: Array<IUser>): [] => {
  const res: any = []
  data.forEach((v, i) => {
    res.push({
      ...(v.uuid ? { uuid: v.uuid } : {}),
      ...(v.email ? { email: v.email } : {}),
      ...(v.phone ? { phone: v.phone } : {}),
      ...(v.password ? { phone: v.password } : {}),
      ...(v.firstName ? { first_name: v.firstName } : {}),
      ...(v.lastName ? { last_name: v.lastName } : {}),
      ...(v.basicId ? { basic_id: v.basicId } : {}),
      ...(v.lastLogin ? { last_login: v.lastLogin } : {}),
      ...(v.lastChangePassword ? { last_change_password: v.lastChangePassword } : {}),
      ...(v.createdAt ? { created_at: v.createdAt } : {}),
      ...(v.updatedAt ? { updated_at: v.updatedAt } : {}),
      ...(v.deletedAt ? { deleted_at: v.deletedAt } : {}),
    })
  })
  return res
}
