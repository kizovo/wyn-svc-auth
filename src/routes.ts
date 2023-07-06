import { Elysia, t } from 'elysia'
import constant from './constant'
import UserHandler from './handlers/UserHandler'

const userHandler = new UserHandler

const routes = ({
  prefix = 'users'
}) => (app: Elysia) => app
  .group(`api/${prefix}/v1`, app => {
    return app
      .post('/sign-up', ({ body }) =>
        userHandler.insertUser(body)
      )
      .get(`/stat`, () => 'Welcome to svc-user')
      .get(`/`, ({ set }) => (
        set.headers = constant.headers,
        userHandler.listUser()
      ))
  })

export default routes;
