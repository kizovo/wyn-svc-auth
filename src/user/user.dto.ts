import * as dto from '@base/base.dto'

export interface IUser {
  id: string
  uuid: string
  email: string
  phone: string
  password: string
  firstName: string
  lastName: string
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
  }
}

// mapping db fields to json
export const mapFieldToJson = (data: Array<IUser>): [] => {
  const res: any = []
  data.forEach((_, i) => {
    res.push({
      ...(data[i].uuid ? { uuid: data[i].uuid } : {}),
      ...(data[i].email ? { email: data[i].email } : {}),
      ...(data[i].phone ? { phone: data[i].phone } : {}),
      ...(data[i].firstName ? { first_name: data[i].firstName } : {}),
      ...(data[i].lastName ? { last_name: data[i].lastName } : {}),
      ...(data[i].createdAt ? { created_at: data[i].createdAt } : {}),
    })
  })
  return res
}
