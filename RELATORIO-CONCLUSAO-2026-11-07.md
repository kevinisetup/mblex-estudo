# Conclusão parcial e leitura dos erros — 07/11/2026

## Alterações

- Cada questão mostra **Encerrar e ver resultado**. A confirmação avisa que uma alternativa ainda não confirmada não será contada.
- A tela final aceita uma rodada parcial: percentual geral, acertos, erros, pendentes, categoria com melhor percentual, gráfico por domínio e revisão questão a questão.
- Após marcar uma alternativa errada, o feedback destaca a explicação daquela opção como uma **possível confusão**, sem afirmar que conhece o pensamento da aluna.
- A aluna pode marcar uma causa e escrever em até 300 caracteres o que a levou à escolha. Esse texto fica no relatório salvo e no resumo compartilhado.
- A conclusão oferece **Compartilhar resultado**. O compartilhamento continua manual, por imagem e relatório de texto; não envia automaticamente a terceiros.

## Verificação

- Navegador a 375 px: encerramento após duas respostas mostrou 50%, 18 pendentes, gráfico, melhor categoria, erro interpretado e texto autorrelatado no relatório e no arquivo compartilhável.
- Encerramento sem resposta mostrou zero sem falha. Imagem PNG foi gerada.
- Regressão: rodada de 20, reforço após erro, feedback, PT e rodada de 100 com 110:00 passaram; perfil de 20 itens e temporizadores de 40/60/100 passaram. Console sem erros.
- `node audit-adaptive.cjs` e `git diff --check` passaram. Banco permanece com 262 questões únicas.
- A página pública repetiu o teste de encerramento parcial, causa autorrelatada, gráfico e compartilhamento. Firebase Hosting versão `69e56b6586f18788`, HTTP 200; SHA256 público/local do HTML `60F34A88D8E6ACD7BEC685B8A3BBC6E72CAAB3C9FE594CFCCAA618E2610AC779`.

## Envio automático pendente

O endereço de destino informado é `kevin.s.b.brasil@gmail.com`. O usuário decidiu adiar essa integração. O projeto Firebase atual está sem faturamento e a API do Firestore está desativada; não há endpoint de recebimento. O HTML público não deve conter credencial de e-mail. A integração futura requer configurar um serviço de envio, informar a aluna de que as respostas serão transmitidas e testar a entrega real. Até lá, o compartilhamento continua manual.
