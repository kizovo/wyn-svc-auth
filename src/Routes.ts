import { Elysia } from 'elysia'
import { ISignupReq } from '@models/UserModel'
import { errorHandler } from '@handlers/Handler'
import validationHandler from '@handlers/ValidationHandler'
import { ISetup } from '@models/Model'

import UserHandler from '@handlers/UserHandler'
import UserService from '@services/UserService'

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
      this.App.group(`api/users/v1`, (app) => {
        return app
          .model(validationHandler)
          .post(
            '/signup',
            async (context) =>
              await userHandler.userSignup(context, context.body as ISignupReq),
            { body: 'user.signup.in' },
          )
          .get(`/stat`, () => 'Welcome to svc-user')
          .get(`/`, (context) => userHandler.allUserPaginated(context))
      }).onError(({ set }) => {
        return errorHandler(set)
      })
  }
}
