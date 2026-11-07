const fs=require('fs'),vm=require('vm');
let script=fs.readFileSync('dist/index.html','utf8').split('<script>')[1].split('</script>')[0];
script=script.replace(/window\.addEventListener\('beforeunload'[\s\S]*?intro\(\);\s*$/,'');
const context={window:{},document:{},setInterval(){}};
vm.createContext(context);vm.runInContext(script,context);
const data=vm.runInContext('JSON.stringify({bank:BANK,focus:FOCUS_BANK,archived:ARCHIVED_BASIC})',context);
const {bank,focus,archived}=JSON.parse(data),active=[...bank.filter(q=>!q.slot),...focus];
const upgraded=active.filter(q=>q.l===4&&q.origin!=='legado sem origem registrada');
const issues=[];
const ids=new Set(),stems=new Set(),origins={};
const sources=JSON.parse(vm.runInContext('JSON.stringify(SOURCES)',context)),domains={},levels={};
for(const q of active){
 if(ids.has(String(q.id)))issues.push(q.id+': duplicate ID');ids.add(String(q.id));
 if(stems.has(q.q[0].toLowerCase()))issues.push(q.id+': duplicate stem');stems.add(q.q[0].toLowerCase());
 origins[q.origin]=(origins[q.origin]||0)+1;
 domains[q.d]=(domains[q.d]||0)+1;levels[q.l]=(levels[q.l]||0)+1;
 const options=q.o||q.options.map(o=>o.v);
 if(!sources[q.s])issues.push(q.id+': missing source');
 if(q.q.length!==2||q.q.some(v=>!v))issues.push(q.id+': missing language');
 if(options.length!==4||options.some((v,i)=>v.length<2||(i!==0&&v.length<4)))issues.push(q.id+': incomplete choice/reason');
 if(!q.why?.[0]||!q.why?.[1]||!q.hook?.[0]||!q.hook?.[1]||!q.practice?.[0]||!q.practice?.[1])issues.push(q.id+': incomplete feedback');
}
for(const q of upgraded){
 const opts=q.o||q.options.map(o=>o.v);
 if(q.q.length!==2||q.q.some(x=>!x||x.length<40))issues.push(q.id+': stem');
 if(opts.length!==4||opts.some(o=>o.length!==4&&o!==opts[0]))issues.push(q.id+': options');
 if(new Set(opts.map(o=>o[0].toLowerCase())).size!==4)issues.push(q.id+': duplicate option');
 if(!q.why?.[0]||!q.why?.[1]||!q.hook?.[0]||!q.practice?.[0])issues.push(q.id+': explanation');
 if(!q.topic)issues.push(q.id+': topic');
 if(!q.s||!vm.runInContext('Boolean(SOURCES['+JSON.stringify(q.s)+'])',context))issues.push(q.id+': source');
 if(!/\b\d{2}\b/.test(q.q[0])||!/day|week|month|year|minute|hour|yesterday|today|ago/i.test(q.q[0]))issues.push(q.id+': age or time');
}
const missingContext=active.filter(q=>!/\b\d{2}\b/.test(q.q[0])||!/day|week|month|year|minute|hour|yesterday|today|ago/i.test(q.q[0])).map(q=>q.id);
const adaptive=vm.runInContext(`(()=>{const counts={};for(const size of [20,40,60,100]){const deck=makeDeck();if(deck.length!==262||new Set(deck.map(q=>String(q.id))).size!==262)throw Error('pool');const e={deck,records:[],level:size===20?4:3,target:size,correctStreak:0,reinforce:null};chooseNext(e);const first=deck[0];e.records.push({});updateReinforcement(e,first,false);const same=deck.slice(1).some(q=>q.topic===first.topic),category=deck.slice(1).some(q=>q.d===first.d),higher=deck.slice(1).some(q=>q.topic===first.topic&&q.l>first.l);chooseNext(e);if(same&&deck[1].topic!==first.topic)throw Error('topic after error');if(!same&&category&&deck[1].d!==first.d)throw Error('category fallback');if(higher&&deck[1].l<=first.l)throw Error('harder item skipped');const second=deck[1];e.records.push({});updateReinforcement(e,second,false);if(e.level!==Math.min(4,second.l+1))throw Error('error level');chooseNext(e);e.records.push({});updateReinforcement(e,deck[2],true);if(e.level!==2||e.reinforce)throw Error('correct reset');for(const expected of [3,4]){e.records.push({});updateReinforcement(e,deck[e.records.length-1],true);if(e.level!==expected)throw Error('correct rise');}counts[size]=deck.length;}const deck=makeDeck(),low=deck.find(q=>q.l===2&&deck.some(x=>x!==q&&x.topic===q.topic&&x.l>2));if(!low)throw Error('no graded topic');const e={deck,records:[{}],level:3,target:20,correctStreak:0,reinforce:{topic:low.topic,d:low.d,lastLevel:low.l}};const i=deck.indexOf(low);[deck[0],deck[i]]=[deck[i],deck[0]];chooseNext(e);if(deck[1].topic!==low.topic||deck[1].l<=low.l)throw Error('graded reinforcement');return counts})()`,context);
if(process.argv.includes('--missingfeedback')){for(const q of active.filter(q=>!q.hook?.[0]||!q.hook?.[1]||!q.practice?.[0]||!q.practice?.[1]))console.log(q.id+' '+q.q[0]+' hook='+JSON.stringify(q.hook)+' practice='+JSON.stringify(q.practice));process.exit(0)};if(process.argv.includes('--late')){for(const q of active.filter(q=>typeof q.id==='number'&&q.id>=129&&q.id<=187))console.log(q.id+' '+q.q[0]+' => '+(q.o||q.options.map(o=>o.v)).map(o=>o[0]).join(' / '));process.exit(0)};if(process.argv.includes('--missing')){for(const q of active.filter(q=>missingContext.includes(q.id)))console.log(q.id+' '+q.d+' '+q.q[0]);process.exit(0)}
console.log(JSON.stringify({archived:archived.length,upgraded:upgraded.length,new:bank.filter(q=>String(q.id).startsWith('H')).length,basicActive:active.filter(q=>q.l===1).length,active:active.length,domains,levels,images:active.filter(q=>q.img?.src).length,origins,missingContext,adaptive,issues},null,2));
if(archived.length!==17||upgraded.length!==47||active.length!==262||issues.length)process.exitCode=1;
