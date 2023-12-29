import * as dto from '@base/base.dto'

export interface ISignupReq {
  email: string
  password: string
  phone: string
  first_name: string
  last_name: string
}

export interface IDbSignupReq {
  email: string
  password: string
  phone: string
  firstName: string
  lastName: string
}

export interface IDbFields {
  email: boolean
  phone: boolean
  firstName: boolean
  lastName: boolean
}

export interface IDetailUserReq {
  uuid: string[]
}

export interface IListUserReq extends dto.IPaginationReq {
  search: string
  fields: string
}
