import * as dto from '@base/base.dto'
import * as C from '@/constant'
import { isStrIsNumber } from '@base/base.lib'
import {
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
    let result = await this.db.wrapException(async () => {
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
      let isShowEmail = true
      let isShowPhone = true
      let isShowFirstName = true
      let isShowLastName = true

      if (q.fields) {
        isShowEmail = q.fields.includes('email') ?? false
        isShowPhone = q.fields.includes('phone') ?? false
        isShowFirstName = q.fields.includes('first_name') ?? false
        isShowLastName = q.fields.includes('last_name') ?? false
      }

      const result = await this.dbMysql.user.findMany({
        select: q.fields
          ? {
              email: isShowEmail,
              phone: isShowPhone,
              firstName: isShowFirstName,
              lastName: isShowLastName,
            }
          : EXPOSABLE_FIELD,
        where: {
          ...(q.search
            ? {
                OR: [
                  {
                    email: isShowEmail ? { contains: q.search } : {},
                  },
                  {
                    phone: isShowPhone ? { contains: q.search } : {},
                  },
                  {
                    firstName: isShowFirstName ? { contains: q.search } : {},
                  },
                  {
                    lastName: isShowLastName ? { contains: q.search } : {},
                  },
                ],
              }
            : {}),
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
