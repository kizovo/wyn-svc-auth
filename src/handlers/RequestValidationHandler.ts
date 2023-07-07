import { t } from 'elysia'

const requestValidation = {
  'user.signup': t.Object({
    username: t.String(),
    password: t.String({
      minLength: 8
    })
  })
}

export default requestValidation;
