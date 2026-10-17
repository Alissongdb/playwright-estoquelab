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

test.describe('menu Novo produto', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productFormPage = new ProductFormPage(page);
    productsPage = new ProductsPage(page);
    product = gerarProdutoDeTeste();
    await loginAsAdmin(loginPage);
  });

  test('valida os campos obrigatórios antes de salvar', async () => {
    await productFormPage.abrir();
    await productFormPage.getBotaoSalvar().click();

    await expect(productFormPage.getCampoNome()).toHaveAttribute('aria-invalid', 'true');
  });

  test('cadastra um produto com dados válidos', async () => {
    await productFormPage.cadastrarProduto(product);

    await expect(productFormPage.getNotificacao('Produto cadastrado com sucesso!')).toBeVisible();
    await expect(productsPage.getSecao().getByText(product.name, { exact: true })).toBeVisible();
  });
});
