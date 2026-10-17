import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { login } from '../../data/login';

export async function loginAsAdmin(loginPage: LoginPage) {
  await loginPage.abrirPaginaLogin();
  await loginPage.fazerLogin(login.validUsername, login.validPassword);
  await expect(loginPage.getTituloProdutos()).toBeVisible({ timeout: 15_000 });
}
