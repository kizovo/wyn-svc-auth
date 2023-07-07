import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import conf from '@/conf'
import routes from '@/routes'

const app = new Elysia()
  .use(swagger())
  .use(routes({
    path: 'users',
  }))
  .listen(Number(conf.APP_PORT));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
