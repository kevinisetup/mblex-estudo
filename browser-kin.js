async page=>{
 await page.setViewportSize({width:375,height:812});
 await page.evaluate(()=>{state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();});
 return await page.evaluate(async()=>{
  const check=(ok,label)=>{if(!ok)throw Error(label)};
  document.getElementById('direct').click();document.getElementById('count').value='20';document.getElementById('begin').click();
  const ids=[];
  for(let i=51;i<=86;i++){
   const q=state.exam.deck.find(x=>x.id===`H${i}`);check(q&&q.d==='CIN'&&q.l===4,`H${i} bank`);
   check(q.img?.src?.startsWith('media/')&&q.img.quiz,`H${i} image data`);
   state.exam.deck[0]=q;state.exam.index=0;state.exam.selected=null;state.exam.revealed=false;renderQuestion();
   if(q.img.original)check(document.querySelector('.question-visual figcaption [lang="en"]').textContent==='Compare positions A and B before choosing.',`H${i} neutral photo caption`);
   const visuals=[...document.querySelectorAll('.question-text .question-visual img')];check(visuals.length===(q.img.photos?2:1),`H${i} question images`);
   for(const visual of visuals){await visual.decode();check(visual.naturalWidth>0&&visual.naturalHeight>0,`H${i} image decode`);}
   check(document.querySelectorAll('[data-answer]').length===4,`H${i} choices`);
   document.querySelectorAll('[data-answer]')[(q.correct+1)%4].click();document.getElementById('submit').click();
   check(document.querySelectorAll('.choice.correct').length===1&&document.querySelectorAll('.choice.wrong').length===1,`H${i} color feedback`);
   check(document.querySelectorAll('#feedback li').length===3,`H${i} distractor explanations`);
   check(document.querySelector('#feedback a[href]'),`H${i} source`);
   if(q.img.original)check(document.querySelector('#feedback figure figcaption [lang="en"]').textContent===q.img.promptEN,`H${i} image explanation`);
   ids.push(q.id);
  }
  return {checked:ids.length,first:ids[0],last:ids.at(-1),visuals:'decoded',feedback:'correct and three distractors',width:innerWidth};
 });
}
