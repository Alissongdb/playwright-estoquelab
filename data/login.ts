import { faker } from '@faker-js/faker';

export const login = {
  validUsername: 'admin',
  validPassword: '123456',
  invalidUsername: `invalido_${faker.string.alphanumeric(8)}`,
  invalidPassword: faker.string.alphanumeric(12),
};