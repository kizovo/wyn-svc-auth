import { ISetup } from '@base/base.dto'
import { errorHandler } from '@base/base.handler'
import * as dto from '@base/base.dto'

import UserRoutes from './user/user.routes'

export default class Routes {
  private app
  private setup

  constructor(app: any, setup: ISetup) {
    this.app = app
    this.setup = setup
  }

  router() {
    const userRoutes = new UserRoutes(this.app, this.setup)

    return () =>
      this.app
        .get(`/stat`, () => 'Welcome to svc-user')
        .use(userRoutes.router())
        .onError(({ code, error, set }: any) =>
          errorHandler({ code, message: error.message }, set as dto.IHttpSet),
        )
  }
}
