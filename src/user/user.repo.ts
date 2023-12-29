import * as dto from '@base/base.dto'
import {
  IDbFields,
  IDetailUserReq,
  IListUserReq,
  IDbSignupReq,
  ISignupReq,
} from '@/user/user.dto'

// list down all database field that safely expose to view, update & delete
const EXPOSABLE_FIELD = {
  email: true,
  phone: true,
  firstName: true,
  lastName: true,
}

const exposableFieldBySearch = (fields: string): IDbFields => {
  const exp = { ...EXPOSABLE_FIELD }
  if (fields) {
    exp.email = fields.includes('email') ?? false
    exp.phone = fields.includes('phone') ?? false
    exp.firstName = fields.includes('first_name') ?? false
    exp.lastName = fields.includes('last_name') ?? false
  }
  return exp
}

// mapping json to db fields
const mapSignUpDb = (data: ISignupReq): IDbSignupReq => {
  return {
    email: data.email,
    phone: data.phone,
    password: data.password,
    firstName: data.first_name,
    lastName: data.last_name,
  }
}

// mapping db fields to json
const mapSignUpJson = (data: Array<IDbSignupReq>): Array<ISignupReq> => {
  const signUpReq: Array<ISignupReq> = []
  data.forEach((_, i) => {
    signUpReq.push({
      email: data[i].email,
      phone: data[i].phone,
      password: data[i].password,
      first_name: data[i].firstName,
      last_name: data[i].lastName,
    })
  })
  return signUpReq
}

const calculatePage = (r: dto.IPaginationReq): dto.IPage => {
  const pg_num = Number(r.pg_num)
  const pg_size = Number(r.pg_size)
  const skip = pg_num - 1 >= 0 ? (pg_num - 1) * pg_size : 0
  return { pg_num, pg_size, skip }
}

export default class UserRepo {
  private db
  private dbMysql

  constructor(setup: dto.ISetup) {
    this.db = setup.db
    this.dbMysql = this.db.dbMysql()
  }

  async detailUserDb(r: IDetailUserReq): Promise<object> {
    const result = await this.db.wrapException(async () => {
      return await this.dbMysql.user.findMany({
        select: EXPOSABLE_FIELD,
        where: {
          uuid: { in: r.uuid },
        },
      })
    })
    return this.mapResult(result)
  }

  async addUserDb(r: ISignupReq): Promise<object> {
    return this.db.wrapException(async () => {
      const DbSignupReq: IDbSignupReq = mapSignUpDb(r)
      return await this.dbMysql.user.create({ data: DbSignupReq })
    })
  }

  async listUserDb(r: IListUserReq): Promise<object> {
    let { pg_size, pg_num, skip } = calculatePage(r)
    const { result, total } = await this.db.wrapException(async () => {
      const f = exposableFieldBySearch(r.fields)
      const result = await this.dbMysql.user.findMany({
        select: f,
        where: {
          ...(!r.search
            ? {}
            : {
                OR: [
                  { email: f.email ? { contains: r.search } : {} },
                  { phone: f.phone ? { contains: r.search } : {} },
                  { firstName: f.firstName ? { contains: r.search } : {} },
                  { lastName: f.lastName ? { contains: r.search } : {} },
                ],
              }),
        },
        take: pg_size, // for pagination
        skip, // for pagination
      })
      const total = await this.dbMysql.user.count()
      return { result, total }
    })

    const pagination = {
      count: result.length,
      pg_num,
      pg_size,
      total,
    }

    return this.mapResultWithPagination(pagination, result)
  }

  mapResult(data: object): dto.IData {
    const strData = JSON.stringify(data)
    const oData = JSON.parse(strData)
    const result = mapSignUpJson(oData)
    return { data: result, error: null }
  }

  mapResultWithPagination(
    pagination: object,
    data: object,
  ): dto.IDataPagination {
    const strData = JSON.stringify(data)
    const oData = JSON.parse(strData)
    const result = mapSignUpJson(oData)
    return { pagination, data: result, error: null }
  }
}
