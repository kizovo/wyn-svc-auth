import { Elysia } from 'elysia'
import { ISignupReq } from '@models/UserModel'
import { errorHandler } from '@handlers/Handler'
import validationHandler from '@handlers/ValidationHandler'
import SetupDB from '@setup/Db'

import UserHandler from '@handlers/UserHandler'
import UserService from '@services/UserService'

export default class Routes {
  private App: Elysia
  private Db: SetupDB

  constructor(app: Elysia, db: SetupDB) {
    this.App = app
    this.Db = db
  }

  router() {
    const userService = new UserService(this.Db)
    const userHandler = new UserHandler(userService)

    return () => this.App
      .group(`api/users/v1`, (app) => {
      return app
        .model(validationHandler)
        .post('/signup', async ({ set, body }) => (
          await userHandler.userSignup(set, body as ISignupReq)
        ), { body: 'user.signup.in' })
        .get(`/stat`, () => 'Welcome to svc-user')
        .get(`/`, ({ set }) => (
          userHandler.allUserPaginated(set)
        ))
      })
      .onError(({ code, set }) => {
        return errorHandler(set, code)
      })
  }
}
