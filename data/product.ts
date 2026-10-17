import { faker } from '@faker-js/faker';

export interface ProductData {
  name: string;
  sku: string;
}

export function gerarProdutoDeTeste(): ProductData {
  return {
    name: `Produto QA ${faker.string.alphanumeric(6)}`,
    sku: `TST-${faker.string.numeric(3)}`,
  };
}
