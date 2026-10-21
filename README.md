# Doe Sangue – App do Doador

Aplicativo web mobile para doadores de sangue: login, cadastro,
visão geral, agendamentos, histórico de doações, campanhas e perfil.

## Como executar

Não há dependências nem build. Abra `index.html` no navegador ou sirva a pasta:

## Credenciais de demonstração

| Tela      | E-mail                     | Senha   |
|-----------|----------------------------|---------|
| Cadastro  | teste@doesangue.com        | teste   |

## Recursos

- Layout mobile com barra de abas inferior e bottom sheet
- Suporte a áreas seguras em iOS e Android
- Modo escuro automático via `prefers-color-scheme`
- Novos agendamentos entram na lista e atualizam o contador de ativos
- Fontes: Cormorant Garant e Outfit (Google Fonts)

## Personalização

As cores ficam em variáveis CSS no `:root` de `css/styles.css`. O modo escuro
sobrescreve essas variáveis no bloco `prefers-color-scheme: dark`.

Os dados de exemplo (agendamentos, doações e campanhas) estão no topo de `js/app.js`.

## Próximos passos sugeridos

- Integrar uma API real de autenticação e agendamento
- Persistir dados (backend ou `localStorage`)
- Adicionar `manifest.json` e service worker para instalar como PWA
