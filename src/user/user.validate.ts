import { t } from 'elysia'

export const validationHandler = {
  'user.signup.in': t.Object({
    email: t.String(),
    password: t.String({
      minLength: 8,
    }),
  }),
}
