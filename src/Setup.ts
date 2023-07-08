import { PrismaClient } from '@prisma/client'

export default class Setup {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient()
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
