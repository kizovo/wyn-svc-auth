import { t } from 'elysia'

export const validate = {
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
    password: t.String({
      minLength: 8,
      error: 'field password minimum 8 character'
    }),
  }),
}
