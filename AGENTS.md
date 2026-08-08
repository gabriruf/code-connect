# Guia de contribuição para agentes

## Visão geral

Este repositório é um monorepo `pnpm` (versão declarada: `10.30.0`) com dois aplicativos independentes:

- `apps/web`: React 19, TypeScript e Vite.
- `apps/api`: NestJS 11 e TypeScript.

Instale dependências somente pela raiz com `pnpm install`. Não crie `package-lock.json`, `yarn.lock`, repositórios Git internos ou `node_modules` versionados. O lockfile canônico é `pnpm-lock.yaml`.

Use os atalhos da raiz sempre que existirem:

```bash
pnpm dev:web
pnpm dev:api
pnpm build:web
pnpm build:api
pnpm lint:web
pnpm lint:api
pnpm test:api
pnpm test:e2e:api
```

Antes de entregar alterações, execute os comandos relevantes ao app alterado. Não altere artefatos gerados (`dist/`, `coverage/`, `*.tsbuildinfo`) nem o lockfile sem uma mudança intencional de dependências.

## Front-end — `apps/web`

### Stack e estilo

- Use React com TypeScript estrito. Preserve o `type: module` do pacote e as regras do `tsconfig`.
- Use Tailwind CSS para estilos novos. Antes do primeiro uso, instale e configure Tailwind no app Vite; não misture uma nova solução de CSS ou CSS-in-JS sem aprovação.
- Prefira classes utilitárias do Tailwind no JSX. Extraia padrões recorrentes para componentes e tokens/configuração do Tailwind; evite CSS global e seletores por `id` para estilos de produto.
- Mantenha acessibilidade como requisito: HTML semântico, rótulos para controles, foco visível, texto alternativo útil e interações possíveis por teclado.

### Atomic Design

Organize componentes em `apps/web/src/components/` conforme sua responsabilidade visual:

```text
components/
  atoms/       # elementos indivisíveis: Button, Input, Icon, Badge
  molecules/   # composição simples de átomos: SearchField, FormField
  organisms/   # blocos completos: Header, LoginForm, ProductGrid
  templates/   # estrutura de página sem dados concretos
  pages/       # páginas/rotas que compõem templates e dados
```

- Um componente só deve depender de componentes do mesmo nível ou de níveis inferiores; átomos não dependem de moléculas, organismos, templates ou páginas.
- Evite componentes genéricos demais. Coloque estado, chamadas externas e regras de domínio fora de átomos; use hooks, serviços ou módulos de feature quando necessário.
- Nomeie arquivos e componentes em `PascalCase` (por exemplo, `atoms/Button/Button.tsx`) e mantenha arquivos auxiliares próximos ao componente.
- Não use o `App.tsx` como área permanente de implementação: ele deve compor a página raiz.

### Testes obrigatórios

Todo componente novo ou alterado precisa de um teste que cubra seu uso essencial — renderização, conteúdo/estado relevante e a interação pública principal quando existir.

- O projeto ainda não possui runner de testes para o front-end. Ao introduzir o primeiro componente de produto, configure Vitest, React Testing Library e `@testing-library/user-event`, incluindo os scripts `test` e `test:watch` no `apps/web/package.json` e um setup para `@testing-library/jest-dom`.
- Mantenha o teste ao lado do componente, no formato `Button.test.tsx`.
- Teste pelo comportamento percebido pelo usuário (`getByRole`, texto acessível e `userEvent`), não por detalhes de implementação, classes Tailwind ou estado interno.
- Não considere um componente concluído sem seu teste essencial e sem passar `pnpm lint:web`, `pnpm build:web` e os testes do front-end quando configurados.

## Back-end — `apps/api`

### Estrutura NestJS

- Siga a composição do Nest: módulos agrupam domínio, controllers tratam HTTP e services concentram regras de negócio. Controllers devem ser finos.
- Para novos domínios, agrupe arquivos por recurso, por exemplo `src/users/users.module.ts`, `users.controller.ts`, `users.service.ts` e `dto/`.
- Use DTOs tipados para entrada e saída. Valide toda entrada externa com `ValidationPipe` e `class-validator`; nunca confie em `req.body` sem validação.
- Mantenha o TypeScript estrito. Não introduza `any` para contornar tipos. Respeite ESLint e Prettier já configurados.
- Adicione testes unitários para services/controllers e testes e2e para contratos HTTP relevantes. Execute `pnpm test:api` e `pnpm test:e2e:api` quando alterar comportamento da API.

### Contrato REST

Todas as rotas HTTP devem respeitar REST:

- Modele recursos com substantivos no plural, por exemplo `/users` e `/users/:id`; não use verbos em URLs como `/createUser` ou `/getUsers`.
- Use métodos HTTP com a semântica correta: `GET` para leitura segura, `POST` para criar/submeter, `PUT` para substituição idempotente, `PATCH` para atualização parcial e `DELETE` para remoção idempotente.
- Responda com os códigos adequados: `200` para sucesso com corpo, `201` ao criar (com `Location` quando aplicável), `204` para sucesso sem corpo, `400` para requisição inválida, `401` sem autenticação, `403` sem permissão, `404` para recurso inexistente, `409` para conflito e `422` quando a semântica dos dados for inválida.
- Preserve contratos consistentes: JSON, nomes estáveis, tipos previsíveis e mensagens de erro estruturadas. Não exponha entidades internas, stack traces, segredos ou detalhes de infraestrutura.
- Use parâmetros de rota para identidade (`/users/:id`), query params para filtros, ordenação e paginação (`?page=1&limit=20`), e corpo para dados de criação/atualização.
- Para coleções, implemente paginação, limites máximos e metadados de paginação quando o volume puder crescer. Filtragem e ordenação devem ser explícitas e validadas.
- Faça operações idempotentes quando o método exigir; não cause efeitos colaterais em `GET`. Versione a API antes de alterações incompatíveis e documente contratos públicos.

## Git e commits

Há um único repositório Git na raiz. Ambos os apps seguem **Conventional Commits**.

Use o formato:

```text
tipo(escopo opcional): descrição curta no imperativo
```

Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore` e `revert`. Use `web`, `api` ou `repo` como escopo quando ajudar; exemplos:

```text
feat(web): adiciona botão primário reutilizável
fix(api): retorna 404 para usuário inexistente
test(web): cobre envio do formulário de login
chore(repo): atualiza dependências do workspace
```

- A primeira linha deve ser concisa, em minúsculas e sem ponto final.
- Marque mudanças incompatíveis com `!` após tipo/escopo ou com o rodapé `BREAKING CHANGE:`.
- Faça commits pequenos, coesos e apenas com arquivos relacionados. Não inclua formatação ou dependências não relacionadas.
- Antes de commitar, revise `git diff`, valide os comandos relevantes e não faça commit de `.env`, `node_modules`, `dist` ou `coverage`.
