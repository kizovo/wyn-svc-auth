import { Elysia } from 'elysia'
import { errorHandler } from '@base/base.handler'
import * as dto from '@base/base.dto'
import UserHandler from '@/user/user.handler'
import UserService from '@/user/user.service'
import { validationHandler } from '@/user/user.validate'

export default class UserRoutes {
  private App
  private Setup

  constructor(app: Elysia, setup: dto.ISetup) {
    this.App = app
    this.Setup = setup
  }

  router() {
    const userService = new UserService(this.Setup)
    const userHandler = new UserHandler(this.Setup, userService)

    return () =>
      this.App.group(`/users`, (v1) =>
        v1.group(`/v1`, (app) =>
          app
            .model(validationHandler)
            .get(`/list`, ({ set, query }) => userHandler.listUser(set, query))
            .post(`/list`, ({ set, body }) => userHandler.detailUser(set, body))
            .post(
              '/signup',
              ({ set, body }) => userHandler.addUser(set, body),
              {
                body: 'user.signup.in',
                error: ({ code, error, set }) =>
                  errorHandler({ code, message: error.message }, set),
              },
            ),
        ),
      )
  }
}
