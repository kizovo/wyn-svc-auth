import { Elysia } from 'elysia'
import { ISetup } from '@base/base.dto'
import { errorHandler } from '@base/base.handler'

import UserRoutes from './user/user.routes'

export default class Routes {
  private App
  private Setup

  constructor(app: Elysia, setup: ISetup) {
    this.App = app
    this.Setup = setup
  }

  router() {
    const userRoutes = new UserRoutes(this.App, this.Setup)

    return () =>
      this.App.get(`/stat`, () => 'Welcome to svc-user')
        .use(userRoutes.router())
        .onError(({ code, error, set }) =>
          errorHandler({ code, message: error.message }, set),
        )
  }
}
