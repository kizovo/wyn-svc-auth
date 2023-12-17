import * as dto from '@base/base.dto'

export interface ISignupReq {
  email: string
  password: string
}

export interface IDetailUserReq {
  id: number[]
}

export interface IListUserReq extends dto.IPaginationReq {
  search: string
}
