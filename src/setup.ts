import { PrismaClient } from '@prisma/client'

const setup = {
  dbMysql: new PrismaClient()
}

export default setup;
