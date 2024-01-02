import * as dto from '@base/base.dto'
import UserHandler from '@/user/user.handler'
import UserService from '@/user/user.service'
import { reqValidation } from '@/user/user.validate'

export default class UserRoutes {
  private app
  private setup

  constructor(app: any, setup: dto.ISetup) {
    this.app = app
    this.setup = setup
  }

  router = () => {
    const s = new UserService(this.setup)
    const h = new UserHandler(this.setup, s)

    const listUser = ({ set, query }: any) => h.listUser(set, query)
    const detailUser = ({ set, body }: any) => h.detailUser(set, body)
    const deleteUser = ({ set, body }: any) => h.deleteUser(set, body)
    const addUser = ({ set, body }: any) => h.addUser(set, body)
    const signIn = ({ set, body, jwtMod }: any) => h.signIn(set, body, jwtMod)

    return this.app.group(`/users/v1`, (user: any) =>
      user
        .model(reqValidation)
        .get(`/list`, listUser, { query: 'user.list' })
        .post(`/list`, detailUser, { body: 'user.detail' })
        .post(`/delete`, deleteUser, { body: 'user.delete' })
        .post('/signup', addUser, { body: 'user.signup' })
        .post('/signin', signIn, { body: 'user.signin' }),
    )
  }
}
