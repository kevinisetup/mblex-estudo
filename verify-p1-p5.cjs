const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),cp=require('child_process');
const html=fs.readFileSync(require('path').join(__dirname,'dist/index.html'),'utf8').replace(/\r\n/g,'\n');
const old=cp.execFileSync('git',['show','b362bfa0c3f7278a4d045496ea8c940f37559593:dist/index.html'],{encoding:'utf8',cwd:__dirname}).replace(/\r\n/g,'\n');
function load(h){const c=vm.createContext({window:{addEventListener(){}},setInterval(){},Date,Math});vm.runInContext(h.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/intro\(\);\s*$/,''),c);return vm.runInContext('({BANK,DATA_PATCH,ITEMS,PROFILE_EN,SOURCES,classify,exportProfile,makeDeck})',c);}
const d=load(html),o=load(old),plain=x=>JSON.parse(JSON.stringify(x));
assert.equal(d.BANK.length,112);assert.equal(new Set(d.BANK.map(q=>q.q[0])).size,110);assert.equal(d.DATA_PATCH.length,112);
assert.deepEqual(plain(d.BANK.slice(0,100)),plain(o.BANK));
assert.deepEqual(plain(d.DATA_PATCH.slice(0,100)),plain(o.DATA_PATCH));
assert.deepEqual(plain(d.ITEMS.map(x=>[x[0],x[3]])),plain(o.ITEMS.map(x=>[x[0],x[3]])));
for(let i=0;i<20;i++){assert.notEqual(d.ITEMS[i][1],o.ITEMS[i][1]);assert.notEqual(d.PROFILE_EN[i][0],o.PROFILE_EN[i][0]);}
const count={};for(const q of d.BANK){count[q.d]=(count[q.d]||0)+1;assert(d.SOURCES[q.s]);for(let k=0;k<2;k++){assert(q.hook[k]&&q.practice[k]);assert.notEqual(q.hook[k],q.o[0][k]);assert.notEqual(q.practice[k],q.why[k]);}if(['ANA','CIN'].includes(q.d))assert(q.img);}
assert.deepEqual(count,{AVA:17,ETI:17,EFE:18,PRO:17,PAT:14,CIN:16,ANA:13});
for(const level of ['progressive','1','2','3','4']){const a=d.makeDeck(level);assert.equal(a.length,112);assert.equal(new Set(a.map(q=>q.id)).size,112);assert.equal(a[39].id,99);assert.equal(a[79].id,100);for(const q of a){assert.equal(q.options[q.correct].v[0],q.o[0][0]);assert(q.options.filter(x=>x.correct).length===1);}}
for(let n=0;n<500;n++){const a=Array.from({length:20},()=>Math.floor(Math.random()*4));const p=d.classify(a),prev=o.classify(a);for(const k of ['axes','scores','dominant','secondary','tie','note','config'])assert.deepEqual(plain(p[k]),plain(prev[k]));p.created=prev.created;const out=d.exportProfile(p,a),lines=out.split('\n');assert.equal(lines.length,33);assert.equal(lines.slice(0,7).join('\n'),o.exportProfile(prev,a).split('\n').slice(0,7).join('\n'));assert.equal(lines.filter(x=>/^\d+ \| /.test(x)).length,20);for(let i=0;i<20;i++)assert(out.includes(`${i+1} | ${d.ITEMS[i][0]} | ${'ABCD'[a[i]]} | EN: ${d.PROFILE_EN[i][1][a[i]]} | PT: ${d.ITEMS[i][2][a[i]]}`));}
for(const q of d.BANK.slice(100)){assert([2,3].includes(q.l));assert.equal(q.o.length,4);assert(q.o.every(x=>x.length>=2));assert(q.o.slice(1).every(x=>x.length===4));assert.equal(new Set(q.o.map(x=>x[0])).size,4);assert(/\d/.test(q.q[0]));}
assert(!/localStorage|sessionStorage|fetch\(/.test(html));
assert(!/<(?:script|link)[^>]+(?:src|href)=/i.test(html));
console.log(JSON.stringify({bank:112,unique:110,patch:112,newIds:d.BANK.slice(100).map(q=>q.id),images:d.BANK.filter(q=>q.img).length,domains:count,profilesCompared:500,unchangedOriginalQuestions:100,allPassed:true}));

for(const level of ['progressive','1','2','3','4'])for(let run=0;run<20;run++){
 const deck=d.makeDeck(level,100);
 assert.equal(deck.length,100);
 assert.equal(new Set(deck.map(q=>q.id)).size,100);
 assert.equal(deck[39].id,99);assert.equal(deck[79].id,100);
 assert(deck.some(q=>q.id===20));assert(deck.some(q=>q.id===52));
}
console.log('OK: 100 sorteados em cada ordem, duplicatas em 40/80, originais presentes.');
