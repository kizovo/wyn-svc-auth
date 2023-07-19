import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import config from '@/config'
import Routes from '@/Routes'
import SetupDB from '@setup/Db'
import SetupLog from '@setup/Log'

const app = new Elysia()
const setupDB = new SetupDB()
const setupLog = new SetupLog()
const routes = new Routes(app, { db: setupDB, log: setupLog })

const router = routes.router()

app
  .use(swagger())
  .use(router)
  .listen(Number(config.APP_PORT));

if (!await setupDB.isDatabaseConnect()) {
  app.stop();
  process.exit(0)
}

console.log(
`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
