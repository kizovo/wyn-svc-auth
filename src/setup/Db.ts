import config from '@/config'
import { PrismaClient } from '@prisma/client'

export default class Db {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient({
      errorFormat: 'minimal',
      log: [
        {
          emit: "event",
          level: "query",
        },
        "info",
        "warn",
        "error",
      ],
    })
    if (config.APP_ENV != "prod") {
      this.prismaClient.$on("query", (e: { query: string, params: any[], duration: number }) => {
        console.log("Query: " + e.query);
        console.log('Params: ' + e.params)
        console.log("Duration: " + e.duration + "ms");
      });
    }
  }

  public dbMysql() {
    return this.prismaClient;
  }

  async isDatabaseConnect(): Promise<boolean> {
    try {
      await this.prismaClient.$connect();
      console.log('Database connection established!');
      return true;
    } catch (error) {
      console.error('Error connecting to the database');
      return false;
    }
  }
}
