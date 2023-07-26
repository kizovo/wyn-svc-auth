import { Elysia } from 'elysia'
import { ISetup } from '@base/base.dto'
import { errorHandler, validationHandler } from '@base/base.handler'

import UserHandler from '@/user/user.handler'
import UserService from '@/user/user.service'

export default class Routes {
  private App: Elysia
  private Setup: ISetup

  constructor(app: Elysia, setup: ISetup) {
    this.App = app
    this.Setup = setup
  }

  router() {
    const userService = new UserService(this.Setup)
    const userHandler = new UserHandler(this.Setup, userService)

    return () =>
      this.App.group(`users/v1`, (app) => {
        return app
          .model(validationHandler)
          .post(
            '/signup',
            async ({ set, body }) => await userHandler.addUser(set, body),
            {
              body: 'user.signup.in',
              error: ({ code, error, set }) => {
                return errorHandler(code, error, set)
              },
            },
          )
          .get(`/stat`, () => 'Welcome to svc-user')
          .get(`/`, ({ set }) => userHandler.listUser(set))
      }).onError(({ code, error, set }) => {
        return errorHandler(code, error, set)
      })
  }
}
