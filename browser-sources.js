async page=>{
 await page.setViewportSize({width:375,height:812});
 return page.evaluate(()=>{
  window.confirm=()=>true;
  state={screen:'intro',at:0,answers:Array(20).fill(null),profile:null,exam:null};intro();
  document.getElementById('direct').click();
  const box=document.querySelector('[aria-label="Fontes das questões"]');
  if(!box)throw Error('Fonte panel missing');
  box.querySelector('summary').click();
  const links=box.querySelectorAll('ul.sources a');
  if(links.length!==50)throw Error('Expected 50 source links, got '+links.length);
  if(box.textContent.includes('legado sem origem registrada'))throw Error('Old percentages');
  const keys=[...new Set(activeBank().map(q=>q.s))];
  for(const key of keys)if(!box.querySelector(`a[href="${SOURCES[key][1]}"]`))throw Error('Missing source '+key);
  const width=document.documentElement.scrollWidth;
  if(width>375)throw Error('Horizontal overflow '+width);
  document.getElementById('begin').click();
  const current=state.exam.deck[0];
  document.querySelectorAll('[data-answer]')[current.correct].click();document.getElementById('submit').click();
  if(!document.getElementById('feedback').querySelector('a[href="'+SOURCES[current.s][1]+'"]'))throw Error('Missing question source');
  document.getElementById('end-now').click();
  if(!document.querySelector('[aria-label="Fontes das questões"]'))throw Error('Result source panel missing');
  return {links:links.length,questions:activeBank().length,width,questionSource:current.s};
 });
}
