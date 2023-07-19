import SetupDB from '@setup/Db'
import SetupLog from '@setup/Log'

export interface IError {
  code: string
  message: string
  e: unknown
}

export interface IData {
  data: object | null
  error: IError | null
}

export interface IJsonResponse {
  code: string
  data: object
  message: string
  success: boolean
}

export interface IErrorMsg {
  [key: string]: string
}

export interface IErrorCode {
  [key: string]: number
}

export interface ISetup {
  db: SetupDB
  log: SetupLog
}
