# Página de Login reutilizável

## Resumo

Criar a página de login fiel ao layout fornecido, com Atomic Design, Tailwind CSS, validação local e adaptação mobile que oculta o banner. A estrutura permitirá reutilizar o mesmo template na futura página de cadastro.

## Implementação

- Configurar Tailwind CSS no app Vite e remover os estilos/demo padrão do template.
- Configurar Vitest, React Testing Library e `user-event`, com scripts de teste no `apps/web/package.json`.
- Criar átomos reutilizáveis para campo de texto, checkbox, botão, link, divisor e botão social; todos com estados de foco acessíveis.
- Criar `LoginForm` como organismo, contendo email/usuário, senha, lembrar-me, links internos para `/recuperar-senha` e `/cadastro`, acesso social com os PNGs fornecidos e validação de campos obrigatórios.
- Criar um template de autenticação que receba banner, textos e formulário como composição. O login fornecerá `banner-login.png`; o futuro cadastro poderá substituir banner e formulário sem duplicar o layout.
- Criar a página de login e manter `App.tsx` apenas como composição da página raiz.
- Reproduzir o visual: fundo escuro, painel central, banner lateral, elementos decorativos de elos ao fundo e paleta verde. Em telas estreitas, ocultar o banner e manter o cartão/formulário responsivo e centralizado.
- O envio válido será tratado localmente e não chamará API nem exibirá estado de sucesso nesta entrega.

## Interfaces e acessibilidade

- O template exporá propriedades para conteúdo do banner e bloco de formulário, evitando acoplamento ao login.
- `LoginForm` terá callback tipado opcional para futura integração de autenticação.
- Campos terão `label`, `autocomplete` apropriado, mensagens de erro associadas e foco visível; links, checkbox e botões sociais serão navegáveis por teclado.

## Testes

- Testar renderização de campos, banner e ações sociais.
- Testar validação ao enviar campos vazios.
- Testar o comportamento público do checkbox “Lembrar-me” e navegação pelos links internos.
- Executar `pnpm lint:web`, `pnpm build:web` e os testes configurados para o front-end.

## Premissas

- Autenticação real, recuperação de senha, cadastro e OAuth ficam fora de escopo.
- As rotas futuras serão `/recuperar-senha` e `/cadastro`.
- No mobile, o banner e suas decorações são ocultados para priorizar o formulário.
