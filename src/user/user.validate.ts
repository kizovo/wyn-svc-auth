import { t } from 'elysia'
import * as C from '@/constant'

export const reqValidation = {
  'user.list': t.Object({
    pg_num: t.String(),
    pg_size: t.String(),
    search: t.Optional(
      t.String({
        minLength: 3,
        error: 'field search minimum 3 character',
      }),
    ),
    fields: t.Optional(
      t.String({
        error: 'invalid fields',
      }),
    ),
  }),
  'user.detail': t.Object({
    uuid: t.Array(
      t.String({
        error: 'field uuid should array of string',
      }),
    ),
  }),
  'user.delete': t.Object({
    uuid: t.Array(
      t.String({
        error: 'field uuid should array of string',
      }),
    ),
  }),
  'user.signup': t.Object({
    email: t.Optional(
      t.String({
        format: 'email',
        error: 'field email invalid format',
      }),
    ),
    phone: t.Optional(
      t.RegExp(C.REGEX.PHONE_E164, {
        error:
          'field phone invalid format (max. 15 digit), i.e +(country_code)(city_code)(subs_number)',
      }),
    ),
    password: t.RegExp(C.REGEX.PASSWORD_MEDIUM, {
      error: 'field password min. 8 char, at least 1 uppercase',
    }),
    first_name: t.String({
      maxLength: 50,
      error: 'field first name max. 50 char',
    }),
    last_name: t.String({
      maxLength: 50,
      error: 'field last name max. 50 char',
    }),
  }),
  'user.signin': t.Object({
    email: t.Optional(
      t.String({
        format: 'email',
        error: 'field email invalid format',
      }),
    ),
    phone: t.Optional(
      t.RegExp(C.REGEX.PHONE_E164, {
        error:
          'field phone invalid format (max. 15 digit), i.e +(country_code)(city_code)(subs_number)',
      }),
    ),
    password: t.RegExp(C.REGEX.PASSWORD_MEDIUM, {
      error: 'field password min. 8 char, at least 1 uppercase',
    }),
  }),
}
