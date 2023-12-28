import {  } from '/home/neohub/works/wyn-svc-auth/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';

export function fakeUser() {
  const RANDOM_UPPER_CASE = faker.string.alpha({ length: 1, casing:'upper' })
  const RANDOM_LOWER_CASE = faker.string.alpha({ length: 3, casing: 'lower' })
  const RANDOM_NUMBER = faker.string.numeric(4)
  const RANDOM_SPECIAL_CHAR = faker.string.symbol(1)
  const PASSWORD_MEDIUM = RANDOM_UPPER_CASE + RANDOM_LOWER_CASE + RANDOM_NUMBER + RANDOM_SPECIAL_CHAR
  const PHONE_E164 = `+${faker.string.numeric({ length: {min:10,max:14}})}`

  return {
    email: faker.internet.email(),
    phone: PHONE_E164,
    password: PASSWORD_MEDIUM,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}
export function fakeUserComplete() {
  const user = fakeUser()
  return {
    id: faker.number.int(),
    email: user.email,
    phone: user.phone,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export const users = faker.helpers.uniqueArray(fakeUser, 1500);
