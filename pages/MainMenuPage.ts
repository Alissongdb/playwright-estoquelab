import type { Page } from '@playwright/test';
import { BasePage } from '../shared/bases/BasePage';

export type MainMenuName =
  | 'lnkProdutos'
  | 'lnkNovoProduto'
  | 'lnkMovimentacoes'
  | 'lnkFornecedores'
  | 'lnkRelatorios'
  | 'lnkInventario'
  | 'lnkReservas'
  | 'lnkValidades';

export class MainMenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  protected async abrirMenu(name: MainMenuName) {
    await this.currentWindow().locator(`[name="${name}"]`).click();
  }

  getNotificacao(text: string) {
    return this.currentWindow().locator('[name^="msgToast_"]').filter({ hasText: text });
  }
}
