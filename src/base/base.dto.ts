import SetupDB from '@setup/Db'
import SetupLogSentry from '@/setup/LogSentry'

export interface IError {
  code: string
  message: string
}

export interface IData {
  data: object
  error: IError | null
}

export interface IDataPagination {
  pagination: object
  data: object
  error: IError | null
}

export interface IHttpSet {
  headers: Record<string, string>
  status?: number
  redirect?: string
}

export interface IJsonResponse {
  meta: IMeta
  pagination?: object
  data?: object | null
}

export interface IMeta {
  code: string
  status: string
  message: string
}

export interface IErrorMsg {
  [key: string]: string
}

export interface ISetup {
  db: SetupDB
  log: SetupLogSentry
}

export interface IPaginationReq {
  pg_num: string
  pg_size: string
}

export interface IPage {
  pgNum: number
  take: number
  skip: number
}
