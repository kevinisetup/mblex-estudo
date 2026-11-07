# Simulado MBLEx — auditoria da rodada adaptativa

Data: 07/11/2026. Fonte publicada: `dist/index.html`. Catálogo legível: `dist/questoes-completas.md`.

## Entrega

- 17 itens rotulados Básico foram arquivados e substituídos no mesmo tema por casos de decisão mais exigentes. Os conceitos essenciais permanecem.
- 40 itens autorais difíceis (H01–H40) foram acrescentados. O banco ativo tem **272 enunciados únicos**: 182 numéricos, 50 F e 40 H. Não há item ativo no nível Básico.
- H31–H40 usam os quatro novos prints como referência de temas: alcance acima da cabeça, rotação do antebraço, fixações do ombro, ação do quadríceps e do reto femoral, reflexo de estiramento, órgãos tendinosos, registro de crepitação, saída motora somática e rotação do quadril. São casos autorais, sem copiar o gabarito dos papéis.
- O usuário escolhe apenas 20, 40, 60 ou 100 perguntas. A rodada de 20 começa no nível mais alto; as demais, no intermediário. O relógio usa 66 segundos por item, até 110 minutos para 100.
- Após erro, a próxima questão prioriza o mesmo subtema, ou a mesma categoria quando o subtema se esgota, e sobe de dificuldade quando existe item disponível. Após acerto, a dificuldade reinicia em 2 e sobe com acertos seguintes. Nenhum enunciado se repete na rodada.
- A correção mostra acerto em verde, erro em vermelho, resposta correta e explicação de cada distrator em inglês e português. O controle PT oculta a tradução do enunciado e das opções, preservando a tradução no gabarito.
- Perfil de 20 itens, exportação, gráficos por domínio, compartilhamento manual e navegação foram preservados.

## Contagens verificadas

| Medida | Resultado |
| --- | ---: |
| Questões ativas únicas | 272 |
| Substituídas | 17 |
| Novas | 40 |
| Por domínio: AVA / ETI / EFE / PRO / PAT / CIN / ANA | 36 / 44 / 38 / 32 / 43 / 44 / 35 |
| Por nível: 2 / 3 / 4 | 75 / 86 / 111 |
| Origem registrada: fonte pública verificada / síntese autoral / print + fonte | 21 / 13 / 23 |
| Legado sem origem editorial registrada | 215 |
| Itens com imagem remota no banco | 35 |
| Vinhetas sem idade ou duração detectadas | 0 |
| IDs ou enunciados ativos duplicados | 0 |

Nas 10 novas questões: CIN 5, ANA 3, AVA 1, EFE 1. Cada uma tem quatro alternativas, justificativa dos três distratores, inglês e português, idade e duração, fonte no feedback. As cinco URLs novas foram abertas com HTTP 200; o inventário completo das 45 fontes usadas também retornou 200. O navegador abriu as dez questões, confirmou destaque verde/vermelho, três razões, tradução e link da fonte.

As origens indicam inspiração editorial, não probabilidade de cair na prova. Os 215 itens legados mostram fonte de consulta por questão, mas essa fonte não prova sua origem editorial. Os prints fornecidos serviram como referência de tema e formato, não como gabarito.

## Verificação

- `node audit-adaptive.cjs`: passou estrutura, tradução, fontes, 17 arquivos originais, 47 substituições/adições, unicidade, idade/duração e regras de seleção. Resultado: `issues: []`.
- Navegador real a 375 px: rodada 20 concluída, reforço por subtema/categoria após erro, resposta correta e três distratores, PT desligado com feedback bilíngue, relatório de 20 itens, rodada 100 com 110:00 e progresso 100. Passou.
- Perfil: 20 respostas, perfil calculado, exportação detalhada e relógios de 40/60/100 em 44/66/110 minutos. Passou.
- Console do navegador: zero erros e zero avisos na sessão de teste. `git diff --check`: passou.

## Limites

- A seleção por subtema depois do erro é uma estratégia deste treino. Não há afirmação de que seja a regra interna do MBLEx. O simulador não possui calibração psicométrica oficial da banca.
- As 57 questões substituídas/novas e os ajustes clínicos identificados foram revisados editorialmente; uma revisão independente de todas as 272 questões por especialista e teste no aparelho da aluna não foram realizados.
- As respostas ficam na memória do navegador. O responsável só as recebe quando a aluna compartilha ou exporta; não há painel remoto automático nem rastreamento por IP.
- As imagens remotas dependem de internet; quando indisponíveis, o roteiro textual permanece.

Fontes de referência: [FSMTB Candidate Handbook](https://fsmtb.org/wp-content/uploads/2026/09/MBLEx-Candidate-Handbook-2026.pdf), [FSMTB Content Outline](https://fsmtb.org/wp-content/uploads/2025/12/MBLEx-Content-Outline.pdf), além das fontes de consulta ligadas a cada questão.

## Publicação e preservação

- Firebase Hosting: versão `4c5a94d0b0ceab6c`, endereço `https://provalicencabellavie.web.app/`.
- HTML público e local: HTTP 200, SHA256 `B8B8B1E1A8D8BC880A4BCB54B9A363754C40A7A45E4872E0037F9E91D582BAB9`.
- Catálogo público e local: HTTP 200, SHA256 `5CF558AAC220A5D219486459E7DA29CA878B5563DD048E259141F61146A90095`.
- A página pública foi aberta no navegador e repetiu o teste da rodada de 20 com correção e relatório, além da abertura de 100 com 110:00; passou.
- Fonte e testes: branch GitHub `codex/firebase-hosting`. A cópia offline `../index.html` tem o mesmo hash do HTML público.
