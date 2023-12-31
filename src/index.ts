import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { jwtMod } from '@/setup/JwtMod'
import config from '@/config'
import routes from '@/routes'
import SetupDBMysql from '@setup/DbMysql'
import SetupLog from '@/setup/LogSentry'

const app = new Elysia()
const setupDBMysql = new SetupDBMysql()
const setupLog = new SetupLog()
const route = new routes(app, { dbMysql: setupDBMysql, log: setupLog })

app
  .use(swagger())
  .use(jwtMod)
  .use(route.router())
  .listen(Number(config.APP_PORT))

if (!setupDBMysql.isDatabaseConnect()) {
  app.stop()
  process.exit(0)
}

console.log(
`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
