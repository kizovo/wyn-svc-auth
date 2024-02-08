import config from '@/config'
import * as lib from '@base/base.lib'
import { PrismaClient as PrismaMysql } from '@prisma-mysql/client'

export default class DbMysql {
  private prismaMysql: PrismaMysql

  constructor() {
    this.prismaMysql = new PrismaMysql({
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
      this.prismaMysql.$on('query' as never, (e: { query: string; params: object; duration: number }) => {
        lib.log(`Query: ${e.query}`)
        lib.log(`Params: ${e.params}`)
        lib.log(`Duration: ${e.duration} ms`)
      })
    }
  }

  prisma() {
    return this.prismaMysql
  }

  async isDatabaseConnect(): Promise<boolean> {
    try {
      await this.prismaMysql.$connect()
      lib.log('Database connection established!')
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
      return this.mapFail(error.code, 'Unique constraint violation. This record already exists.')
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
      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
        return this.handlePrismaError(error) as T
      } else {
        // Handle non-Prisma errors here or re-throw them
        throw error
      }
    }
  }
}
