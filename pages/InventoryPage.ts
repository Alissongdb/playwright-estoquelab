import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class InventoryPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkInventario');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secInventario"]');
  }

  getBotaoRegistrarContagem() {
    return this.currentWindow().locator('[name="btnSalvarInventario"]');
  }

  getCampoProduto() {
    return this.currentWindow().locator('[name="selProdutoInventario"]');
  }

  async registrarContagemDoPrimeiroProduto() {
    await this.getCampoProduto().selectOption({ index: 1 });
    await this.currentWindow().locator('[name="inpContagemInventario"]').fill('18');
    await this.currentWindow().locator('[name="selMotivoInventario"]').selectOption({ label: 'Contagem cíclica' });
    await this.currentWindow().locator('[name="chkConferidoInventario"]').check();
    await this.getBotaoRegistrarContagem().click();
  }
}
