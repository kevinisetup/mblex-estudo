async page=>{
 await page.evaluate(()=>{state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();});
 await page.setViewportSize({width:375,height:812});
 return await page.evaluate(()=>{
  const check=(ok,label)=>{if(!ok)throw Error(label)},click=id=>document.getElementById(id).click();
  click('start');for(let i=0;i<20;i++){document.querySelector('[data-choice="0"]').click();click('next');}
  check(state.screen==='result'&&state.profile&&state.answers.every(x=>x===0),'20 profile answers');
  click('generate');const exportText=document.querySelector('pre')?.textContent||document.body.textContent;
  check(exportText.includes('PERFIL-MBLEX v1')&&exportText.includes('RESPOSTAS DETALHADAS')&&exportText.includes('PERFIL COMPLETO'),'profile export');
  click('configure');const timers={};
  for(const size of [40,60,100]){document.getElementById('count').value=String(size);click('begin');timers[size]=remaining();check(state.exam.target===size&&remaining()===size*66000,'timer '+size);state.exam=null;setup();}
  return {profile:state.profile.dominant,export:'pass',timers};
 });
}
