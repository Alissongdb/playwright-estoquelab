import { expect, test } from '@playwright/test';
import { AccountRegistrationPage } from '../pages/AccountRegistrationPage';
import { account } from '../data/account';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;
let registrationPage: AccountRegistrationPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  registrationPage = new AccountRegistrationPage(page);
  await loginPage.abrirPaginaLogin();
});

test('cria uma conta de teste', async () => {
  await registrationPage.abrirFormularioCadastro();
  await registrationPage.cadastrarConta(account.username, account.password);

  await expect(loginPage.getTituloLogin()).toBeVisible();
  await expect(registrationPage.getMensagemSucessoCadastro()).toBeVisible();
});