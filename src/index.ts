import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import config from '@/config'
import Routes from '@/Routes'
import SetupDB from '@setup/Db'

const app = new Elysia()
const setupDB = new SetupDB()
const routes = new Routes(app, setupDB)
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
