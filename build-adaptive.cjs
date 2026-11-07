const fs=require('fs');
const file='dist/index.html';
let html=fs.readFileSync(file,'utf8');
const block='// ADAPTIVE CONTENT START\n'+fs.readFileSync('adaptive-content.js','utf8')+'\n// ADAPTIVE CONTENT END\n';
if(html.includes('// ADAPTIVE CONTENT START'))html=html.replace(/\/\/ ADAPTIVE CONTENT START[\s\S]*?\/\/ ADAPTIVE CONTENT END\n/,block);
else html=html.replace('let ptEnabled=true;',block+'let ptEnabled=true;');
fs.writeFileSync(file,html);
