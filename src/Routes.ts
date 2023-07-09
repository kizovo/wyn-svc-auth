import { Elysia } from 'elysia'
import { ISignupReq } from '@models/UserModel'
import { errorResponse } from '@handlers/BasicHandler'
import constant from '@/constant'
import Setup from '@/Setup'
import validationHandler from '@handlers/ValidationHandler'

import UserHandler from '@handlers/UserHandler'
import UserService from '@services/UserService'

export default class Routes {
  private App: Elysia
  private Setup: Setup

  constructor(app: Elysia, setup: Setup) {
    this.App = app
    this.Setup = setup
  }

  router() {
    const userService = new UserService(this.Setup)
    const userHandler = new UserHandler(userService)

    return () => this.App
      .group(`api/users/v1`, (app) => {
      return app
        .model(validationHandler)
        .post('/signup', async ({ set, body }) => (
          set.headers = constant.headers,
          await userHandler.insertUser(body as ISignupReq)
        ), { body: 'user.signup.in' })
        .get(`/stat`, () => 'Welcome to svc-user')
        .get(`/`, ({ set }) => (
          set.headers = constant.headers,
          userHandler.listUser()
        ))
      })
      .onError(({ code, error, set }) => {
        console.log(error)
        if (code === 'NOT_FOUND') {
          const CODE_NUM = constant.error_code[code]
          set.status = CODE_NUM
          return errorResponse(CODE_NUM.toString(), `We looked everywhere, but it seems the file you're searching for is on vacation. It left no forwarding address!`)
        }
        if (code === 'INTERNAL_SERVER_ERROR') {
          const CODE_NUM = constant.error_code[code]
          set.status = CODE_NUM
          return errorResponse(CODE_NUM.toString(), `Uh-oh! Our server gremlins are up to their mischief again. They've hidden the requested page in a parallel universe. We're on it!`)
        }
      })
  }
}
