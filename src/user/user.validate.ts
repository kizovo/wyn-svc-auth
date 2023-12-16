import { t } from 'elysia'

export const validate = {
  'user.detail': t.Object({
    id: t.Array(t.Number()),
  }),
  'user.signup': t.Object({
    email: t.String(),
    password: t.String({
      minLength: 8,
    }),
  }),
}
