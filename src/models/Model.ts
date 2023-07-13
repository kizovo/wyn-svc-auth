import SetupDB from '@setup/Db'
import SetupLog from '@setup/Log'

interface IError {
  code: string;
  message: string;
}

interface IObjKeyString {
  [key: string]: string;
}

interface IObjValNumber {
  [key: string]: number;
}

interface ISetup {
  db: SetupDB
  log: SetupLog
}

export {
  IError,
  IObjKeyString,
  IObjValNumber,
  ISetup
}
