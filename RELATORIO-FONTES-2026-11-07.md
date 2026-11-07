# Fontes das questões — 07/11/2026

- O quadro de porcentagens de origem editorial saiu da configuração e do resultado. Em seu lugar há uma lista recolhível das fontes de consulta, com os IDs das questões relacionadas a cada link.
- Cada correção continua mostrando a fonte daquela questão. O catálogo `dist/questoes-completas.md` agora mostra somente a fonte de consulta de cada item, sem o rótulo editorial que confundia a leitura.
- As 262 questões ativas têm chave de fonte válida. São 40 links usados; a checagem de acesso HTTP retornou 200 para os 40 em 07/11/2026. Dois endereços que bloqueavam a leitura automatizada foram trocados por páginas acessíveis sobre o mesmo conceito: pressão arterial (MedlinePlus) e massagem pré-natal (Cleveland Clinic).
- Navegador a 375 px: a lista exibiu 40 links, não transbordou horizontalmente, a correção mostrou o link da questão respondida e o resultado manteve a lista. Auditoria do banco e `git diff --check` passaram.
- Firebase Hosting versão `f14213b615276963`; HTML e catálogo públicos responderam HTTP 200 com hashes iguais aos arquivos locais. HTML SHA256 `CAD4F8ACC5EB2A76A3101727040F527B02B7FEFBF9D75E49E19D4D37200A3636`; catálogo SHA256 `C70509842B78744A824F68F32F59E4B91BD860C004C3034E9F4D4B8BE94ED41B`. O teste de navegador foi repetido no endereço público.

Limite: um link acessível e pertinente ao conceito não prova, sozinho, cada detalhe do enunciado ou do gabarito. As questões são autorais de treino, não itens oficiais da FSMTB. Uma revisão clínica e editorial independente de todos os 262 gabaritos continua pendente.
