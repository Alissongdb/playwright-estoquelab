import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class ReportsPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkRelatorios');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secRelatorios"]');
  }

  getBotaoGerarRelatorio() {
    return this.currentWindow().locator('[name="btnGerarRelatorio"]');
  }

  async gerarRelatorio() {
    await this.getBotaoGerarRelatorio().click();
  }

  async selecionarVisaoTodos() {
    await this.currentWindow().getByRole('tab', { name: 'Todos', exact: true }).click();
  }
}
