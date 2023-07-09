import { IUser } from '@models/UserModel'

export default class UserRepository {
  private db

  constructor(Db: any) {
    this.db = Db
  }

  async queryListUser(): Promise<IUser> {
    this.db.$queryRaw
    return await this.db.user.findMany();
  }

  async queryInsertUser(req: any) {
    await this.db.user.create({
      data: req
    })
  }
}
