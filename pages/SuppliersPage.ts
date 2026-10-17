import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class SuppliersPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkFornecedores');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secFornecedores"]');
  }

  getCampoNome() {
    return this.currentWindow().locator('[name="inpNomeFornecedor"]');
  }

  async cadastrarFornecedor(name: string, email: string) {
    await this.currentWindow().locator('[name="btnAdicionarFornecedor"]').click();
    await this.currentWindow().locator('[name="inpNomeFornecedor"]').fill(name);
    await this.currentWindow().locator('[name="inpEmailFornecedor"]').fill(email);
    await this.currentWindow().locator('[name="btnSalvarFornecedor"]').click();
  }

  async enviarCadastroVazio() {
    await this.currentWindow().locator('[name="btnAdicionarFornecedor"]').click();
    await this.currentWindow().locator('[name="btnSalvarFornecedor"]').click();
  }
}
