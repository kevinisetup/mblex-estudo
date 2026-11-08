# Preservação do projeto

## 08/11/2026 — auditoria do banco e revisão de erros

- Origem: `publicacao/`, branch `codex/kin-images`.
- Código e relatório recebidos pelo GitHub em `kevinisetup/mblex-estudo`, commit `edaec6ae019dce953118ff125b457392c55ab226`. Cobertura: seis arquivos alterados, incluindo `dist/index.html`, banco, testes, catálogo de questões e `AUDITORIA-2026-11-08.md`. Os 14 arquivos de mídia usados pela página já eram rastreados pelo Git.
- Publicação: Firebase Hosting `https://provalicencabellavie.web.app`. Em 08/11/2026, a resposta HTTP foi 200 e o SHA-256 do HTML público coincidiu com o arquivo local implantado.
- Recuperação: clonar o repositório, selecionar a branch indicada e abrir `dist/index.html` com a pasta `dist/media`; `firebase.json` identifica o site publicado. A checagem automatizada `node audit-adaptive.cjs` passou com 322 itens ativos; os limites da revisão de conteúdo estão no relatório.
- Documentos essenciais estão no GitHub; não houve cópia confirmada no Google Drive. Arquivos locais não rastreados, inclusive rascunhos de trabalho, permanecem na worktree e **não** estão cobertos por este backup. A worktree deve ser mantida até serem classificados.
- Classificação: material de estudo público e código, sem credenciais neste registro. Não remover esta worktree nesta etapa.
