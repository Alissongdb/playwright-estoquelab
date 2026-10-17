import { expect, test } from '@playwright/test';
import { gerarProdutoDeTeste } from '../data/product';
import { LoginPage } from '../pages/LoginPage';
import { MovementsPage } from '../pages/MovementsPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let movementsPage: MovementsPage;
let productFormPage: ProductFormPage;

test.describe('menu Movimentações', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    movementsPage = new MovementsPage(page);
    productFormPage = new ProductFormPage(page);
    await loginAsAdmin(loginPage);
  });

  test('valida o formulário sem uma movimentação preenchida', async () => {
    await movementsPage.abrir();
    await movementsPage.getBotaoRegistrar().click();

    await expect(movementsPage.getCampoProduto()).toHaveAttribute('aria-invalid', 'true');
  });

  test('registra uma entrada para um produto cadastrado', async () => {
    await productFormPage.cadastrarProduto(gerarProdutoDeTeste());
    await movementsPage.abrir();
    await movementsPage.registrarEntradaDoPrimeiroProduto();

    await expect(movementsPage.getNotificacao('Entrada registrada com sucesso!')).toBeVisible();
  });
});
