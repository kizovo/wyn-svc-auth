import * as dto from '@base/base.dto'
import * as C from '@/constant'
import { isStrIsNumber } from '@base/base.lib'
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
  password: false,
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
  let signUpReq: Array<ISignupReq> = []
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

const calculatePage = (q: dto.IPaginationReq): dto.IPage => {
  const pg_num =
    q.pg_num && isStrIsNumber(q.pg_num) ? Number(q.pg_num) : C.DEFAULT.PG_NUM
  const pg_size =
    q.pg_size && isStrIsNumber(q.pg_size)
      ? Number(q.pg_size)
      : C.DEFAULT.PG_SIZE
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

  async qDetailUser(r: IDetailUserReq): Promise<object> {
    console.log(EXPOSABLE_FIELD)
    const result = await this.db.wrapException(async () => {
      return await this.dbMysql.user.findMany({
        select: EXPOSABLE_FIELD,
        where: {
          id: { in: r.id },
        },
      })
    })
    return this.mapResult(result)
  }

  async qAddUser(r: ISignupReq): Promise<object> {
    return this.db.wrapException(async () => {
      const DbSignupReq: IDbSignupReq = mapSignUpDb(r)
      return await this.dbMysql.user.create({ data: DbSignupReq })
    })
  }

  async qListUser(q: IListUserReq): Promise<object> {
    let { pg_size, pg_num, skip } = calculatePage(q)
    let { result, total } = await this.db.wrapException(async () => {
      const f = exposableFieldBySearch(q.fields)
      const result = await this.dbMysql.user.findMany({
        select: f,
        where: {
          ...(!q.search
            ? {}
            : {
                OR: [
                  { email: f.email ? { contains: q.search } : {} },
                  { phone: f.phone ? { contains: q.search } : {} },
                  { firstName: f.firstName ? { contains: q.search } : {} },
                  { lastName: f.lastName ? { contains: q.search } : {} },
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
