# Pokédex — Desafio Técnico Lumis

Pokédex interativa com busca por nome/número, filtro por tipo e paginação, consumindo a [PokéAPI](https://pokeapi.co/).

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| Vanilla JS (ES Modules) | — | Lógica da aplicação sem frameworks |
| [Vite](https://vite.dev/) | 8 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilização utilitária |
| [Vitest](https://vitest.dev/) | 4 | Testes unitários |
| [PokéAPI](https://pokeapi.co/) | v2 | Fonte de dados dos Pokémon |

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18

## Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Gerar build de produção
npm run build

# Visualizar build de produção localmente
npm run preview
```

## Testes

```bash
# Executar todos os testes uma vez
npm test

# Executar testes em modo watch (re-executa ao salvar)
npm run test:watch
```

## Observações

- **Estado centralizado:** o estado da página (`pokemon`, `currentPage`, `selectedType`, etc.) vive em um único objeto no módulo `Home.js`, re-renderizado manualmente a cada mudança.
- **Race condition na busca:** um contador de geração (`searchGeneration`) garante que respostas de requisições antigas sejam descartadas quando o usuário digita rapidamente.
- **Tipos `stellar` e `unknown`** são filtrados da lista pois não possuem Pokémon associados na API.
- A PokéAPI não exige autenticação, mas realiza múltiplas chamadas em paralelo (`Promise.all`) para carregar os detalhes de cada página.