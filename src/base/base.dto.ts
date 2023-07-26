import SetupDB from '@setup/Db'
import SetupLog from '@setup/Log'

export interface IError {
  code: string
  message: string
  e: unknown
}

export interface IData {
  data: object
  error: IError | null
}

export interface IJsonResponse {
  code: string
  data: object | null
  error: string
  message: string
}

export interface IErrorMsg {
  [key: string]: string
}

export interface ISetup {
  db: SetupDB
  log: SetupLog
}