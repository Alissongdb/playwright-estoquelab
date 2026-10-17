import { expect, test } from '@playwright/test';
import { gerarProdutoDeTeste, type ProductData } from '../data/product';
import { LoginPage } from '../pages/LoginPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { ReportsPage } from '../pages/ReportsPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let productFormPage: ProductFormPage;
let reportsPage: ReportsPage;
let product: ProductData;

test.describe('menu Relatório', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productFormPage = new ProductFormPage(page);
    reportsPage = new ReportsPage(page);
    product = gerarProdutoDeTeste();
    await loginAsAdmin(loginPage);
  });

  test('exibe a opção de gerar relatório', async () => {
    await reportsPage.abrir();

    await expect(reportsPage.getSecao()).toBeVisible();
    await expect(reportsPage.getBotaoGerarRelatorio()).toBeEnabled();
  });

  test('gera relatório incluindo os produtos cadastrados', async () => {
    await productFormPage.cadastrarProduto(product);
    await reportsPage.abrir();
    await reportsPage.gerarRelatorio();
    await reportsPage.selecionarVisaoTodos();

    await expect(reportsPage.getSecao().getByText(product.name, { exact: true })).toBeVisible();
  });
});
