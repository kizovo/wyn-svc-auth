import { t } from 'elysia'

export default class UserRepository {
  private Db

  constructor(db: any) {
    this.Db = db
  }

  async queryListUser() {
    await this.Db.user.findMany();
  }

  async queryInsertUser(req: any) {
    await this.Db.user.create({
      data: req
    }),
    {
      req: t.Object({
        username: t.String(),
        password: t.String({
          minLength: 8
        })
      })
    }
  }
}
