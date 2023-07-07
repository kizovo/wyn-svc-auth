import { Elysia, t } from 'elysia'
import constant from '@/constant'
import requestValidation from '@handlers/RequestValidationHandler'
import UserHandler from '@handlers/UserHandler'
import { ISignupReq } from '@models/UserModel'

const userHandler = new UserHandler

const routes = ({
  path = 'users'
}) => (app: Elysia) => app
  .group(`api/${path}/v1`, app => {
    return app
      .model(requestValidation)
      .post('/signup', async ({ set, body }) => (
        set.headers = constant.headers,
        await userHandler.insertUser(body as ISignupReq)
      ), { body: 'user.signup' })
      .get(`/stat`, () => 'Welcome to svc-user')
      .get(`/`, ({ set }) => (
        set.headers = constant.headers,
        userHandler.listUser()
      ))
  })

export default routes;
