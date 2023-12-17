import { t } from 'elysia'

export const validate = {
  'user.list': t.Object({
    pg_num: t.String(),
    pg_size: t.String(),
    search: t.String({
      minLength: 3,
      error: 'field search minimum 3 character'
    })
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
    phone: t.RegExp(/^\+[1-9]\d{1,14}$/,
      {
        error: 'field phone invalid format'
      }),
    password: t.String({
      minLength: 8,
      error: 'field password minimum 8 character'
    }),
  }),
}
