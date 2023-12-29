import {  } from '/home/neohub/works/wyn-svc-auth/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';



export function fakeUser() {
  return {
    email: faker.internet.email(),
    phone: faker.lorem.words(5),
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
    email: faker.internet.email(),
    phone: faker.lorem.words(5),
    password: faker.lorem.words(5),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  };
}
