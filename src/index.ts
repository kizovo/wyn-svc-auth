import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import config from '@/config'
import routes from '@/routes'
import SetupDB from '@setup/Db'
import SetupLog from '@setup/Log'

const app = new Elysia()
const setupDB = new SetupDB()
const setupLog = new SetupLog()
const route = new routes(app, { db: setupDB, log: setupLog })

app.use(swagger()).use(route.router()).listen(Number(config.APP_PORT))

if (!await setupDB.isDatabaseConnect()) {
  app.stop();
  process.exit(0)
}

console.log(
`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
