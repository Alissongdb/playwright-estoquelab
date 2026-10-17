# Testes automatizados — EstoqueLab

Projeto de testes end-to-end com Playwright para validar os principais fluxos do [EstoqueLab](https://estoquelab.netlify.app/), usando Page Objects.

Os testes também são executados automaticamente no CI/CD pelo GitHub Actions em atualizações e pull requests.

## Como executar

```bash
npm install
npx playwright install
npm test
```

Para abrir a interface interativa do Playwright:

```bash
npx playwright test --ui
```
