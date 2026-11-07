async page=>{
 await page.setViewportSize({width:375,height:812});
 await page.evaluate(()=>{
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();
  document.getElementById('direct').click();document.getElementById('begin').click();
 });
 for(const [id,glyph] of [['H71','↙'],['H82','↓'],['H84','→']]){
  await page.evaluate(id=>{
   const q=state.exam.deck.find(q=>q.id===id);
   if(!q)throw Error('Missing '+id);
   state.exam.deck[0]=q;state.exam.index=0;state.exam.selected=null;state.exam.revealed=false;renderQuestion();
  },id);
  const arrow=page.locator('.question-visual .kin-arrow');
  if(await arrow.count()!==1||await arrow.textContent()!==glyph)throw Error('Arrow '+id);
  await page.locator('.question-visual').screenshot({path:`.playwright-cli/${id}-arrow.png`});
 }
 return 'Three arrow pilots visible at 375 px';
}
