import {  } from '/home/neohub/works/wyn-svc-auth/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';



export function fakeUser() {
  return {
    email: undefined,
    phone: undefined,
    password: faker.lorem.words(5),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    updatedAt: undefined,
    deletedAt: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    uuid: '[object Object]',
    email: undefined,
    phone: undefined,
    password: faker.lorem.words(5),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    basicId: false,
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  };
}
