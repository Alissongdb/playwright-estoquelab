import { faker } from '@faker-js/faker';

export const account = {
  username: `qa_${faker.string.alphanumeric(10).toLowerCase()}`,
  password: faker.string.alphanumeric(12),
};