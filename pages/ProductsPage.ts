import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class ProductsPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkProdutos');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secProdutos"]');
  }

  getCampoBusca() {
    return this.currentWindow().locator('[name="inpBuscarProduto"]');
  }

  getFiltroCategoria() {
    return this.currentWindow().locator('[name="selFiltrarCategoria"]');
  }

  getBotaoLimparFiltros() {
    return this.currentWindow().locator('[name="btnLimparFiltrosProdutos"]');
  }
}
