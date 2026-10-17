import type { Page } from '@playwright/test';
import type { ProductData } from '../data/product';
import { MainMenuPage } from './MainMenuPage';

export class ProductFormPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkNovoProduto');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secFormularioProduto"]');
  }

  getBotaoSalvar() {
    return this.currentWindow().locator('[name="btnSalvarProduto"]');
  }

  getCampoNome() {
    return this.currentWindow().locator('[name="inpNomeProduto"]');
  }

  async cadastrarProduto(product: ProductData) {
    await this.abrir();
    await this.currentWindow().locator('[name="inpNomeProduto"]').fill(product.name);
    await this.currentWindow().locator('[name="inpSkuProduto"]').fill(product.sku);
    await this.currentWindow().locator('[name="selCategoriaProduto"]').selectOption({ label: 'Eletrônicos' });
    await this.currentWindow().locator('[name="abaEstoquePrecoProduto"]').click();
    await this.currentWindow().locator('[name="inpPrecoProduto"]').fill('10,00');
    await this.currentWindow().locator('[name="inpEstoqueProduto"]').fill('20');
    await this.getBotaoSalvar().click();
    await this.getNotificacao('Produto cadastrado com sucesso!').waitFor();
  }
}
