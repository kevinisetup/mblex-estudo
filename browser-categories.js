async page=>{
 await page.evaluate(()=>{state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};});
 await page.reload();
 await page.setViewportSize({width:375,height:812});
 return page.evaluate(()=>{
  const check=(ok,label)=>{if(!ok)throw Error(label)};
  const results=[];
  for(const d of Object.keys(DOMAINS)){
   state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();document.getElementById('direct').click();
   const select=document.getElementById('domain');select.value=d;select.dispatchEvent(new Event('change'));
   const available=activeBank().filter(q=>q.d===d).length;
   check(Number(document.getElementById('count').value)===20,d+' default');
   for(const opt of document.getElementById('count').options)check(opt.disabled===(Number(opt.value)>available),d+' count '+opt.value);
   document.getElementById('begin').click();
   check(state.exam.domain===d&&state.exam.target===20&&state.exam.deck.length===available,d+' setup');
   check(state.exam.deck.every(q=>q.d===d)&&state.exam.deck[0].l===4,d+' deck');
   const q=state.exam.deck[0],wrong=(q.correct+1)%4;
   document.querySelectorAll('[data-answer]')[wrong].click();document.getElementById('submit').click();
   check(document.querySelectorAll('.choice.correct').length===1&&document.querySelectorAll('.choice.wrong').length===1,d+' feedback');
   check(document.querySelectorAll('#feedback li').length===3,d+' distractors');
   results.push({domain:d,available,first:q.id});
  }
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();document.getElementById('direct').click();
  check(Number(document.getElementById('count').value)===100,'all default');
  document.getElementById('begin').click();
  check(state.exam.target===100&&state.exam.deck.length===322&&state.exam.deck[0].l===4,'all setup');
  return results;
 });
}
