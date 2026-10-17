import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class MovementsPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkMovimentacoes');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secMovimentacoes"]');
  }

  getBotaoRegistrar() {
    return this.currentWindow().locator('[name="btnRegistrarMovimentacao"]');
  }

  getCampoProduto() {
    return this.currentWindow().locator('[name="selProdutoMovimentacao"]');
  }

  async registrarEntradaDoPrimeiroProduto() {
    await this.getCampoProduto().selectOption({ index: 1 });
    await this.currentWindow().locator('[name="rdoTipoMovimentacao"]').nth(0).check();
    await this.currentWindow().locator('[name="inpQuantidadeMovimentacao"]').fill('5');
    await this.currentWindow().locator('[name="selMotivoMovimentacao"]').selectOption({ label: 'Compra' });
    await this.getBotaoRegistrar().click();
  }
}
