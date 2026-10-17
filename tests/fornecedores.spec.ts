import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { SuppliersPage } from '../pages/SuppliersPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let suppliersPage: SuppliersPage;
let supplierName: string;
let supplierEmail: string;

test.describe('menu Fornecedores', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    suppliersPage = new SuppliersPage(page);
    supplierName = `Fornecedor ${faker.string.alphanumeric(6)}`;
    supplierEmail = `${faker.string.alphanumeric(8).toLowerCase()}@example.test`;
    await loginAsAdmin(loginPage);
  });

  test('valida o cadastro de fornecedor vazio', async () => {
    await suppliersPage.abrir();
    await suppliersPage.enviarCadastroVazio();

    await expect(suppliersPage.getCampoNome()).toHaveAttribute('aria-invalid', 'true');
  });

  test('cadastra um fornecedor', async () => {
    await suppliersPage.abrir();
    await suppliersPage.cadastrarFornecedor(supplierName, supplierEmail);

    await expect(suppliersPage.getNotificacao('Fornecedor cadastrado com sucesso!')).toBeVisible();
    await expect(suppliersPage.getSecao().getByText(supplierName, { exact: true })).toBeVisible();
  });
});
