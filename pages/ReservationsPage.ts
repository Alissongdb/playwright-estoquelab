import type { Page } from '@playwright/test';
import { MainMenuPage } from './MainMenuPage';

export class ReservationsPage extends MainMenuPage {
  constructor(page: Page) {
    super(page);
  }

  async abrir() {
    await this.abrirMenu('lnkReservas');
  }

  getSecao() {
    return this.currentWindow().locator('[name="secReservas"]');
  }

  getBotaoCriarReserva() {
    return this.currentWindow().locator('[name="btnSalvarReserva"]');
  }

  getCampoProduto() {
    return this.currentWindow().locator('[name="selProdutoReserva"]');
  }

  async criarReservaDoPrimeiroProduto() {
    await this.getCampoProduto().selectOption({ index: 1 });
    await this.currentWindow().locator('[name="inpSolicitanteReserva"]').fill('Equipe de testes');
    await this.currentWindow().locator('[name="inpQuantidadeReserva"]').fill('2');
    await this.currentWindow().locator('[name="inpPrazoReserva"]').fill('2030-12-31');
    await this.getBotaoCriarReserva().click();
  }
}
