async page=>{
 await page.evaluate(()=>{state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};});
 await page.reload();
 await page.setViewportSize({width:375,height:812});
 const first=await page.evaluate(()=>{
  const check=(ok,label)=>{if(!ok)throw Error(label)};
  localStorage.removeItem(HISTORY_KEY);
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();
  document.getElementById('direct').click();document.getElementById('count').value='20';document.getElementById('begin').click();
  const q=state.exam.deck[0];document.querySelectorAll('[data-answer]')[(q.correct+1)%4].click();document.getElementById('submit').click();
  check(readHistory().length===1&&readHistory()[0].answers.length===1&&!readHistory()[0].ended,'partial save');
  const cause=document.querySelector('[data-cause]');cause.value='Conteúdo';cause.dispatchEvent(new Event('change'));
  const thought=document.querySelector('[data-thought]');thought.value='Confundi duas opções';thought.dispatchEvent(new Event('input'));
  check(readHistory()[0].answers[0].cause==='Conteúdo'&&readHistory()[0].answers[0].thought==='Confundi duas opções','cause save');
  finish(false);check(!!readHistory()[0].ended,'finish save');
  document.getElementById('history-finished').click();
  check(document.body.textContent.includes('Histórico de estudo')&&document.body.textContent.includes('Evolução por categoria'),'history UI');
  check(document.querySelectorAll('details.glass').length>=1,'round detail');
  const result={rounds:readHistory().length,answers:readHistory()[0].answers.length,domain:q.d,topic:q.topic};
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};return result;
 });
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#history-download').click()]);
 if(!download.suggestedFilename().endsWith('.json'))throw Error('history export');
 await page.reload();
 const second=await page.evaluate(()=>{
  const check=(ok,label)=>{if(!ok)throw Error(label)};
  document.getElementById('history').click();check(readHistory().length===1&&document.body.textContent.includes('1 rodada registrada'),'reload history');
  const sample=activeBank().find(q=>q.d==='AVA'&&q.topic==='intake');
  check(!!sample,'sample topic');
  const row={id:'old-question',d:sample.d,topic:sample.topic,correct:false,selected:['A','A'],answer:['B','B']};
  localStorage.setItem(HISTORY_KEY,JSON.stringify([{started:1000,ended:2000,target:20,domain:'all',answers:[row,row]}]));
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();startExam(20);
  check(state.exam.historyDebt['AVA|intake']===2,'two errors counted');
  check(state.exam.deck[0].d==='AVA'&&state.exam.deck[0].topic==='intake','next round priority');
  const recovered={...row,correct:true};localStorage.setItem(HISTORY_KEY,JSON.stringify([{started:1000,ended:2000,target:20,domain:'all',answers:[row,row,recovered,recovered]}]));
  check(historySignals().debt['AVA|intake']===0,'later success reduces priority');
  localStorage.setItem(HISTORY_KEY,'broken');check(readHistory()===null,'corrupt history warning');
  const chosen=state.exam.deck[0];state.exam.records.push({id:chosen.id,selected:chosen.correct,correct:true});
  saveRound();check(localStorage.getItem(HISTORY_KEY)==='broken','corrupt history preserved');
  localStorage.removeItem(HISTORY_KEY);
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();
  return {priority:'pass',recovery:'pass',reload:'pass'};
 });
 return {first,second};
}
