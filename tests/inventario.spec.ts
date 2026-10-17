import { expect, test } from '@playwright/test';
import { gerarProdutoDeTeste } from '../data/product';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let productFormPage: ProductFormPage;

test.describe('menu Inventário', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productFormPage = new ProductFormPage(page);
    await loginAsAdmin(loginPage);
  });

  test('valida o registro de contagem vazio', async () => {
    await inventoryPage.abrir();
    await inventoryPage.getBotaoRegistrarContagem().click();

    await expect(inventoryPage.getCampoProduto()).toHaveAttribute('aria-invalid', 'true');
  });

  test('registra a contagem de um produto cadastrado', async () => {
    await productFormPage.cadastrarProduto(gerarProdutoDeTeste());
    await inventoryPage.abrir();
    await inventoryPage.registrarContagemDoPrimeiroProduto();

    await expect(inventoryPage.getNotificacao('Inventário registrado e estoque atualizado.')).toBeVisible();
  });
});
