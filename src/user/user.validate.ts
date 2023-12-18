import { t } from 'elysia'
import * as C from '@/constant'

export const reqValidation = {
  'user.list': t.Object({
    pg_num: t.String(),
    pg_size: t.String(),
    search: t.Optional(
      t.String({
        minLength: 3,
        error: 'field search minimum 3 character'
      }),
    ),
    fields: t.String({
      error: "invalid fields",
    }),
  }),
  'user.detail': t.Object({
    id: t.Array(
      t.Number({
        error: "field id should array of number"
      })
    ),
  }),
  'user.signup': t.Object({
    email: t.String({
      format: 'email',
      error: 'field email invalid format'
    }),
    phone: t.RegExp(C.REGEX.PHONE_E164,
      {
        error: 'field phone invalid format (max. 15 digit), i.e +(country_code)(city_code)(subs_number)'
      }),
    password: t.RegExp(C.REGEX.PASSWORD_STRONG,
      {
        error: 'field password min. 8 char, at least 1 uppercase'
      }),
  }),
}
