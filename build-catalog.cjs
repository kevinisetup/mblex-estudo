const fs=require('fs'),vm=require('vm');
let script=fs.readFileSync('dist/index.html','utf8').split('<script>')[1].split('</script>')[0];
script=script.replace(/window\.addEventListener\('beforeunload'[\s\S]*?intro\(\);\s*$/,'');
const context={window:{},document:{},setInterval(){}};vm.createContext(context);vm.runInContext(script,context);
const {bank,focus,archived,domains,levels,sources}=JSON.parse(vm.runInContext('JSON.stringify({bank:BANK,focus:FOCUS_BANK,archived:ARCHIVED_BASIC,domains:DOMAINS,levels:LEVELS,sources:SOURCES})',context));
const active=[...bank.filter(q=>!q.slot),...focus];
const lines=['# Questões completas do simulado MBLEx','','Banco ativo: '+active.length+' questões únicas. As 17 versões básicas anteriores ficam arquivadas no HTML e não entram nas rodadas.','','Questões autorais de treino; não são itens oficiais nem uma previsão do exame. Cada item traz a fonte consultada para seu conceito.',''];
for(const d of Object.keys(domains)){
 lines.push('## '+domains[d],'');
 const group=active.filter(q=>q.d===d).sort((a,b)=>(a.topic||a.s).localeCompare(b.topic||b.s)||String(a.id).localeCompare(String(b.id),undefined,{numeric:true}));
 for(const q of group){
  const options=q.o||q.options.map(o=>o.v),correct=q.o?0:q.correct;
  lines.push('### '+q.id+' · '+(q.topic||q.s)+' · '+levels[q.l-1],'', '**EN:** '+q.q[0]+'','**PT:** '+q.q[1],'');
  for(let i=0;i<4;i++)lines.push('- '+String.fromCharCode(65+i)+'. '+options[i][0]+' / '+options[i][1]+(i===correct?' **[correta]**':''));
  lines.push('','**Por quê:** '+q.why[0]+' / '+q.why[1],'','**Outras alternativas:**');
  for(let i=0;i<4;i++)if(i!==correct)lines.push('- '+String.fromCharCode(65+i)+': '+options[i][2]+' / '+options[i][3]);
  lines.push('','**Gancho:** '+q.hook.join(' / '),'','**Na prática:** '+q.practice.join(' / '),'','**Fonte de consulta:** ['+sources[q.s][0]+']('+sources[q.s][1]+')','');
 }
}
lines.push('## Arquivo das 17 versões substituídas','','Essas versões permanecem no código para rastreio e nunca são sorteadas.','');
for(const q of archived)lines.push('- '+q.id+': '+q.q[0]);
fs.writeFileSync('dist/questoes-completas.md',lines.join('\n')+'\n');
