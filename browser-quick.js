async page=>{
 await page.evaluate(()=>{state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};});
 await page.reload();
 await page.setViewportSize({width:375,height:812});
 return await page.evaluate(()=>{
  const check=(value,name)=>{if(!value)throw Error(name)};
  const click=id=>document.getElementById(id).click();
  click('direct');document.getElementById('count').value='20';click('begin');
  const start={target:state.exam.target,pool:state.exam.deck.length,unique:new Set(state.exam.deck.map(q=>String(q.id))).size,level:state.exam.level,time:remaining()};
  check(start.target===20&&start.pool===318&&start.unique===318&&start.level===4,'20 setup');
  check(start.time<=1320000&&start.time>1310000,'22 minute clock');
  const first=state.exam.deck[0],hasTopic=state.exam.deck.slice(1).some(q=>q.topic===first.topic);
  document.querySelectorAll('[data-answer]')[(first.correct+1)%4].click();click('submit');
  check(document.querySelectorAll('.choice.correct').length===1&&document.querySelectorAll('.choice.wrong').length===1,'red green');
  check(document.querySelectorAll('#feedback li').length===3,'distractor explanations');
  click('submit');const second=state.exam.deck[1];
  check(hasTopic?second.topic===first.topic:second.d===first.d,'immediate reinforcement');
  check(state.exam.level>=3,'error level');
  document.querySelectorAll('[data-answer]')[second.correct].click();click('submit');
  check(state.exam.level===2&&state.exam.reinforce===null,'correct reset');
  click('submit');click('pt-toggle');
  check(document.body.classList.contains('pt-off')&&getComputedStyle(document.querySelector('.question-text .pt')).display==='none','PT hidden');
  const third=state.exam.deck[2];document.querySelectorAll('[data-answer]')[third.correct].click();click('submit');
  check(state.exam.level===3,'correct level rise');
  check(document.querySelectorAll('#feedback [lang="pt-BR"]').length>0,'bilingual explanation');
  click('submit');
  while(state.exam.records.length<20){const q=state.exam.deck[state.exam.index];document.querySelectorAll('[data-answer]')[q.correct].click();click('submit');click('submit');}
  check(state.screen==='break'&&document.querySelector('.score').textContent.includes('/ 20'),'20 block result');
  click('continue');check(state.screen==='finished'&&state.exam.records.length===20,'final result');
  click('review');check(state.screen==='review'&&document.querySelectorAll('details.glass').length>=20,'full report');
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();click('direct');document.getElementById('count').value='100';click('begin');
  const hundred={target:state.exam.target,time:remaining(),progress:document.querySelector('progress').max};
  check(hundred.target===100&&hundred.time<=6600000&&hundred.time>6590000&&hundred.progress===100,'100 110 clock');
  return {start,first:{id:first.id,topic:first.topic},second:{id:second.id,topic:second.topic},hundred,report:'pass',feedback:'pass'};
 });
}
