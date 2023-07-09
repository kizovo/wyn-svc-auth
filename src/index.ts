import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import config from '@/config'
import Routes from '@/Routes'
import Setup from '@/Setup'

const app = new Elysia()
const setup = new Setup()
const routes = new Routes(app, setup)
const router = routes.router()

app
  .use(swagger())
  .use(router)
  .listen(Number(config.APP_PORT));

if (!await setup.isDatabaseConnect()) {
  app.stop();
  process.exit(0)
}

console.log(
`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
