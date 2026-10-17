import { expect, test } from '@playwright/test';
import { login } from '../data/login';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.abrirPaginaLogin();
});

test('realiza login com as credenciais de demonstração', async () => {
  await loginPage.fazerLogin(login.validUsername, login.validPassword);

  await expect(loginPage.getTituloProdutos()).toBeVisible();
});

test('exibe erro ao informar credenciais inválidas', async () => {
  await loginPage.fazerLogin(login.invalidUsername, login.invalidPassword);

  await expect(loginPage.getMensagemErro()).toHaveText('Usuário ou senha inválidos.');
});