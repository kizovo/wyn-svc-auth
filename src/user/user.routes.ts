import { Elysia } from 'elysia'
import * as dto from '@base/base.dto'
import UserHandler from '@/user/user.handler'
import UserService from '@/user/user.service'
import { validate } from '@/user/user.validate'

export default class UserRoutes {
  private App
  private Setup

  constructor(app: Elysia, setup: dto.ISetup) {
    this.App = app
    this.Setup = setup
  }

  router() {
    const s = new UserService(this.Setup)
    const h = new UserHandler(this.Setup, s)

    return () =>
      this.App.group(`/users/v1`, (app: any) =>
        app
          .model(validate)
          .get(`/list`, ({ set, query }: any) => h.listUser(set, query))
          .post(
            `/list`, ({ set, body }: any) => h.detailUser(set, body),
            { body: 'user.detail' },)
          .post(
            '/signup', ({ set, body }: any) => h.addUser(set, body),
            { body: 'user.signup' },
          ),
      )
  }
}
