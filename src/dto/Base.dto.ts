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

export interface IObjKeyString {
  [key: string]: string
}

export interface IObjValNumber {
  [key: string]: number
}

export interface ISetup {
  db: SetupDB
  log: SetupLog
}
