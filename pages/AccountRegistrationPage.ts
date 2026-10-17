import type { Page } from '@playwright/test';
import { BasePage } from '../shared/bases/BasePage';

export class AccountRegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async abrirFormularioCadastro() {
    await this.currentWindow().locator('[name="btnCriarConta"]').click();
  }

  async cadastrarConta(username: string, password: string) {
    await this.currentWindow().locator('[name="inpUsuarioCadastro"]').fill(username);
    await this.currentWindow().locator('[name="inpSenhaCadastro"]').fill(password);
    await this.currentWindow().locator('[name="btnRegistrarUsuario"]').click();
  }

  getMensagemSucessoCadastro() {
    return this.currentWindow()
      .locator('[name^="msgToast_"]')
      .filter({ hasText: 'Usuário cadastrado com sucesso!' });
  }
}