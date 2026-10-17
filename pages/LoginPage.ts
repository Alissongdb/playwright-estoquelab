import type { Page } from '@playwright/test';
import { BasePage } from '../shared/bases/BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async abrirPaginaLogin() {
    await this.currentWindow().goto('/');
  }

  async fazerLogin(username: string, password: string) {
    await this.currentWindow().locator('[name="inpUsuarioLogin"]').fill(username);
    await this.currentWindow().locator('[name="inpSenhaLogin"]').fill(password);
    await this.currentWindow().locator('[name="btnEntrar"]').click();
  }

  getTituloProdutos() {
    return this.currentWindow().locator('[name="tituloProdutos"]');
  }

  getMensagemErro() {
    return this.currentWindow().locator('[name="msgErroLogin"]');
  }

  getTituloLogin() {
    return this.currentWindow().locator('[name="tituloLogin"]');
  }
}