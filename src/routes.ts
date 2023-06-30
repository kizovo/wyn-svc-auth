import { Elysia, t } from 'elysia'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const routes = ({
  prefix = 'users'
}) => (app: Elysia) => app
  .group(`api/${prefix}/v1`, app => {
    return app
      .get(`/stat`, () => 'Welcome to svc-user')
      .post('/sign-up', async ({ body }) => db.user.create({
          data: body
        }),
        {
          body: t.Object({
            username: t.String(),
            password: t.String({
              minLength: 8
            })
          })
        }
      )
      .get(`/`, ({ set }) => (
        set.headers["x-powered-by"] = "wyn",
        {
          'users': [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
          ],
        })
      )
  })

export default routes;
