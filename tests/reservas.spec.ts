import { expect, test } from '@playwright/test';
import { gerarProdutoDeTeste } from '../data/product';
import { LoginPage } from '../pages/LoginPage';
import { ProductFormPage } from '../pages/ProductFormPage';
import { ReservationsPage } from '../pages/ReservationsPage';
import { loginAsAdmin } from './support/loginAsAdmin';

let loginPage: LoginPage;
let productFormPage: ProductFormPage;
let reservationsPage: ReservationsPage;

test.describe('menu Reservas', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productFormPage = new ProductFormPage(page);
    reservationsPage = new ReservationsPage(page);
    await loginAsAdmin(loginPage);
  });

  test('valida o formulário de reserva vazio', async () => {
    await reservationsPage.abrir();
    await reservationsPage.getBotaoCriarReserva().click();

    await expect(reservationsPage.getCampoProduto()).toHaveAttribute('aria-invalid', 'true');
  });

  test('cria uma reserva para um produto cadastrado', async () => {
    await productFormPage.cadastrarProduto(gerarProdutoDeTeste());
    await reservationsPage.abrir();
    await reservationsPage.criarReservaDoPrimeiroProduto();

    await expect(
      reservationsPage.getNotificacao('Reserva criada. O estoque será baixado somente no atendimento.'),
    ).toBeVisible();
  });
});
