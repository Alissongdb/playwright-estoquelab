import { expect, test } from '@playwright/test';
import { gerarProdutoDeTeste } from '../data/product';
import { ExpirationsPage } from '../pages/ExpirationsPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let expirationsPage: ExpirationsPage;
let productFormPage: ProductFormPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  expirationsPage = new ExpirationsPage(page);
  productFormPage = new ProductFormPage(page);
  await loginAsAdmin(loginPage);
});

test.describe('menu Validades', () => {
  test('valida a atualização de validade sem dados', { lock: 'menu-validades' }, async () => {
    await expirationsPage.abrir();
    await expirationsPage.getBotaoAtualizarValidade().click();

    await expect(expirationsPage.getCampoProduto()).toHaveAttribute('aria-invalid', 'true');
  });

  test('atualiza a validade de um produto cadastrado', { lock: 'menu-validades' }, async () => {
    await productFormPage.cadastrarProduto(gerarProdutoDeTeste());
    await expirationsPage.abrir();
    await expirationsPage.atualizarValidadeDoPrimeiroProduto();

    await expect(expirationsPage.getNotificacao('Validade e status atualizados.')).toBeVisible();
  });
});
