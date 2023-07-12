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

export {
  IError,
  IObjKeyString,
  IObjValNumber
}
