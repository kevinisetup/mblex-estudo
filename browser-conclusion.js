async page=>{
 await page.setViewportSize({width:375,height:812});
 await page.evaluate(()=>{if(typeof state!=='undefined')state.exam=null;});
 await page.reload();
 return page.evaluate(()=>{
  const check=(ok,label)=>{if(!ok)throw Error(label)},click=id=>document.getElementById(id).click();
  window.confirm=()=>true;
  click('direct');document.getElementById('count').value='20';click('begin');
  check(!!document.getElementById('end-now'),'early exit button');
  const q1=state.exam.deck[0];
  document.querySelectorAll('[data-answer]')[(q1.correct+1)%4].click();click('submit');
  check(document.getElementById('feedback').textContent.includes('O que esta escolha pode indicar'),'selected distractor interpretation');
  document.querySelector('[data-cause]').value='Leitura/idioma';document.querySelector('[data-cause]').dispatchEvent(new Event('change'));
  const thought=document.querySelector('[data-thought]');thought.value='Confundi o sinal com outra condição';thought.dispatchEvent(new Event('input'));
  click('submit');
  const q2=state.exam.deck[1];document.querySelectorAll('[data-answer]')[q2.correct].click();click('submit');click('submit');
  click('end-now');
  check(state.screen==='finished'&&state.exam.records.length===2,'partial result');
  check(document.querySelector('.score').textContent.includes('50'),'partial accuracy');
  check(document.body.textContent.includes('18 sem responder'),'unanswered count');
  check(!!document.querySelector('#perf-panel .perf-bar'),'final chart');
  check(document.body.textContent.includes('Melhor percentual'),'best domain');
  check(!!document.getElementById('share-finished'),'share at result');
  check(roundText().includes('Confundi o sinal com outra condição'),'thought in share text');
  check(shareImage().type==='image/png','share image');
  click('review');check(document.body.textContent.includes('Confundi o sinal com outra condição'),'thought in report');
  check(reportHTML().includes('Confundi o sinal com outra condição'),'thought in saved report');
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();click('direct');click('begin');click('end-now');
  check(state.screen==='finished'&&state.exam.records.length===0&&document.querySelector('.score').textContent.includes('0'),'zero answer result');
  return {partial:'pass',reason:'pass',chart:'pass',share:'pass',zero:'pass'};
 });
}
