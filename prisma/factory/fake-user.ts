import {  } from '/home/neohub/works/wyn-svc-auth/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

export function fakeUser() {
  const RANDOM_UPPER_CASE = faker.string.alpha({ length: 1, casing:'upper' })
  const RANDOM_LOWER_CASE = faker.string.alpha({ length: 3, casing: 'lower' })
  const RANDOM_NUMBER = faker.string.numeric(4)
  const RANDOM_SPECIAL_CHAR = faker.string.symbol(1)
  const PASSWORD_MEDIUM = RANDOM_UPPER_CASE + RANDOM_LOWER_CASE + RANDOM_NUMBER + RANDOM_SPECIAL_CHAR
  const PHONE_E164 = `+${faker.string.numeric({ length: { min: 10, max: 14 } })}`
  const DATE_NOW = new Date()

  return {
    uuid: randomUUID(),
    email: faker.internet.email(),
    phone: PHONE_E164,
    // password: PASSWORD_MEDIUM,
    password: '$argon2id$v=19$m=4,t=3,p=1$+FiQB7JI9Gv3cGGsSkUT1XglBgcQ+bPZrhiCVb26WRY$txzdP+Hwl5rcTmEtPswL3gf3VzgOJ+tVDyDt+DI1Q2o',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    basicId: true,
    createdAt: DATE_NOW,
    updatedAt: DATE_NOW,
    deletedAt: undefined,
  };
}
export function fakeUserComplete() {
  const user = fakeUser()
  return {
    id: faker.number.int(),
    uuid: user.uuid,
    email: user.email,
    phone: user.phone,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    basicId: user.basicId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
}

export const users = faker.helpers.uniqueArray(fakeUser, 1000);
