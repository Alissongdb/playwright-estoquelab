import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class ExpirationsPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkValidades');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secValidades"]');
  }

  getBotaoAtualizarValidade() {
    return this.currentWindow().locator('[name="btnSalvarValidade"]');
  }

  getCampoProduto() {
    return this.currentWindow().locator('[name="selProdutoValidade"]');
  }

  async atualizarValidadeDoPrimeiroProduto() {
    await this.getCampoProduto().selectOption({ index: 1 });
    await this.currentWindow().locator('[name="inpDataValidade"]').fill('2030-12-31');
    await this.getBotaoAtualizarValidade().click();
  }
}
