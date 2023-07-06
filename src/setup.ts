import { PrismaClient } from '@prisma/client'

const setup = {
  dbPrisma: new PrismaClient()
}

export default setup;
