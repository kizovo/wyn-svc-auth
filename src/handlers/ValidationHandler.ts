import { t } from 'elysia'

const validationHandler = {
  'user.signup.in': t.Object({
    email: t.String(),
    password: t.String({
      minLength: 8
    })
  })
}

export default validationHandler;
