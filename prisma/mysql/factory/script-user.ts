// https://github.com/luisrudge/prisma-generator-fake-data
// 1. npm install -D prisma-generator-fake-data
// 2. create folder factory
// 3. modify file schema.prisma:
// generator custom_generator {
//     provider = "prisma-generator-fake-data"
//     output = "./factory/fake-[data].ts"
// }
// 4. npx prisma generate
// 5. compile ts to js: $ npx tsc ./prisma/factory/script-[data].ts
// 6. $ node ./prisma/factory/script-[data].js

import { PrismaClient as PrismaMysql } from '@prisma-mysql/client'
import { users } from "./fake-user";
import * as lib from '@base/base.lib'

const prisma = new PrismaMysql();

// A `main` function so that we can use async/await
async function main() {
  // Clear up database
  await prisma.$executeRaw`TRUNCATE TABLE users`
  await prisma.user.deleteMany({ where: {} })
  // Seed the database with users
  await prisma.user.createMany({
    data: users,
  });

  lib.log(`Created users`)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    lib.log(e, 'error')
    await prisma.$disconnect();
    process.exit(1);
  });
