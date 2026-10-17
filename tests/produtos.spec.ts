import { expect, test } from '@playwright/test';
import { gerarProdutoDeTeste, type ProductData } from '../data/product';
import { LoginPage } from '../pages/LoginPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { ProductsPage } from '../pages/ProductsPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let productFormPage: ProductFormPage;
let productsPage: ProductsPage;
let product: ProductData;

test.describe('menu Produtos', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productFormPage = new ProductFormPage(page);
    productsPage = new ProductsPage(page);
    product = gerarProdutoDeTeste();
    await loginAsAdmin(loginPage);
  });

  test('abre a listagem de produtos', async () => {
    await productsPage.abrir();

    await expect(productsPage.getSecao()).toBeVisible();
  });

  test('localiza um produto pelo nome', async () => {
    await productFormPage.cadastrarProduto(product);
    await productsPage.abrir();
    await productsPage.getCampoBusca().fill(product.name);

    await expect(productsPage.getSecao().getByText(product.name, { exact: true })).toBeVisible();
  });
});
