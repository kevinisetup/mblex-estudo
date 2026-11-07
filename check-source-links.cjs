const fs=require('fs'),vm=require('vm');
let script=fs.readFileSync('dist/index.html','utf8').split('<script>')[1].split('</script>')[0];
script=script.replace(/window\.addEventListener\('beforeunload'[\s\S]*?intro\(\);\s*$/,'');
const context={window:{},document:{},setInterval(){}};vm.createContext(context);vm.runInContext(script,context);
const {sources,used}=JSON.parse(vm.runInContext('JSON.stringify({sources:SOURCES,used:[...new Set(activeBank().map(q=>q.s))]})',context));
const rows=[];let index=0;
async function worker(){while(index<used.length){const key=used[index++],url=sources[key][1];try{const response=await fetch(url,{method:'GET',signal:AbortSignal.timeout(12000),redirect:'follow'});rows.push({key,status:response.status,url:response.url});await response.body?.cancel();}catch(error){rows.push({key,status:String(error.cause?.code||error.name),url});}}}
(async()=>{await Promise.all(Array.from({length:8},worker));rows.sort((a,b)=>a.key.localeCompare(b.key));for(const row of rows)console.log(`${row.key}\t${row.status}\t${row.url}`);console.log(`checked=${rows.length} failed=${rows.filter(x=>x.status!==200).length}`)})();
