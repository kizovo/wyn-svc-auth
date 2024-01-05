import SetupDBMysql from '@/_setup/DbMysql'
import SetupLogSentry from '@/_setup/LogSentry'

export interface IError {
  code: string
  message: string
}

export interface IData {
  data: object
  error: IError | null
}

export interface IDataPagination extends IData {
  pagination: object
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
  dbMysql: SetupDBMysql
  log: SetupLogSentry
}

export interface IPaginationReq {
  pg_num: number
  pg_size: number
}

export interface IPage extends IPaginationReq {
  skip: number
}
