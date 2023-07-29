import config from '@/config'
import { PrismaClient } from '@prisma/client'
import * as dto from '@base/base.dto'

export default class Db {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient({
      errorFormat: 'minimal',
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        'info',
        'warn',
        'error',
      ],
    })
    if (config.APP_ENV != 'prod') {
      this.prismaClient.$on(
        'query',
        (e: { query: string; params: object; duration: number }) => {
          console.log('Query: ' + e.query)
          console.log('Params: ' + e.params)
          console.log('Duration: ' + e.duration + 'ms')
        },
      )
    }
  }

  dbMysql() {
    return this.prismaClient
  }

  async isDatabaseConnect(): Promise<boolean> {
    try {
      await this.prismaClient.$connect()
      console.log('Database connection established!')
      return true
    } catch (error) {
      console.error('Error connecting to the database')
      return false
    }
  }

  mapFail(code: string, message: string): object {
    return {
      data: {},
      error: { code, message },
    }
  }

  handlePrismaError(error: any): object {
    if (error.code === 'P2002') {
      return this.mapFail(
        error.code,
        'Unique constraint violation. This record already exists.',
      )
    }

    if (error.code === 'P2025') {
      return this.mapFail(error.code, 'Record not found.')
    }

    return this.mapFail('PE000', 'Something error on Prisma')
  }

  async wrapException<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      // this.LogSentry.captureException(error)
      if (
        error instanceof Error &&
        error.name === 'PrismaClientKnownRequestError'
      ) {
        return this.handlePrismaError(error) as T
      } else {
        // Handle non-Prisma errors here or re-throw them
        throw error
      }
    }
  }
}
