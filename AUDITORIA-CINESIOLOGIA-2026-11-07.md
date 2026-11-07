# Cinesiologia com imagens — auditoria de 07/11/2026

## Entrega

- H51–H80: 30 questões novas, difíceis, com enunciado e opções em inglês e tradução em português, quatro alternativas, resposta, justificativa e explicação dos três distratores. Todas são casos autorais; os prints privados serviram para selecionar os temas, não como gabarito.
- As figuras esquemáticas de bonecos foram retiradas. H51–H76 e H79 usam pares de fotos sintéticas ilustrativas armazenadas no próprio site. H77–H78 usam uma ilustração anatômica da Wikimedia Commons (CC BY 3.0); H80 usa uma foto da Wikimedia Commons (CC BY-SA 3.0). As páginas de crédito e licença estão ligadas na correção.
- O caso H67 usa flexão abdominal fotografada com pelve apoiada, evitando confundir flexão da coluna com dobrar o quadril. H68 deixa explícito que levantar da flexão envolve também extensores do quadril.
- As seis fotos de livros enviadas nesta rodada foram preservadas em `Documentos/Simulado Licença Bellavie/fontes`, com SHA-256. Não são distribuídas pelo site.

## Contagens e verificação

| Medida | Resultado |
| --- | ---: |
| Questões ativas únicas | 312 |
| Cinesiologia | 79 |
| Novas com imagem local (H51–H80) | 30 |
| Imagens no banco ativo | 65 |
| Questões em nível 4 | 151 |
| Questões ativas rotuladas básico | 0 |
| IDs repetidos / vinhetas sem idade ou duração | 0 / 0 |

`node audit-adaptive.cjs` retornou `issues: []`. O navegador em 375 px abriu as 30 questões, decodificou todas as imagens, exibiu quatro opções e confirmou verde/vermelho, três justificativas e fonte na correção. A rodada de 20 e a de 100 passaram: banco de 312 sem repetição, 20 começa no nível 4, 100 usa 110 minutos. O par fotográfico de H67 foi inspecionado visualmente no celular. As cinco fontes distintas usadas em H51–H80 responderam HTTP 200.

## Limites

As fotos sintéticas ilustram posições e não mostram músculos, lesões nem exame físico real. O texto e a fonte de cada resposta prevalecem sobre detalhes visuais. Esta é preparação independente, não uma reprodução de itens oficiais nem da calibração adaptativa da FSMTB. O banco completo de 312 questões não passou por revisão externa de especialista. A consulta às fontes e algumas imagens anteriores ainda requer internet; as novas 30 imagens ficam no pacote local.
