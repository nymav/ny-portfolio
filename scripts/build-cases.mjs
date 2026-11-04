import {readFile,mkdir,writeFile,copyFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const html=await readFile(resolve(root,'dist/index.html'),'utf8');
const cases=[{id:'docatlas',name:'DocAtlas',description:'Evidence-grounded retrieval, inspectable sources and the limits of citation validation.'},{id:'modelguard',name:'ModelGuard',description:'Paired prompt regression evaluation with immutable runs and inspectable evidence.'},{id:'docmend',name:'DocMend',description:'Documentation drift analysis, evidence-bound repairs and explicit crash recovery.'}];
for(const p of cases){
 const dir=resolve(root,'dist/work',p.id);await mkdir(dir,{recursive:true});
 const canonical=`https://nymav.github.io/ny-portfolio/work/${p.id}/`;
 let page=html.replace(/<title>.*?<\/title>/,`<title>${p.name} | Nikhil Yarra</title>`)
  .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/,`$1${p.description}$2`)
  .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/,`$1${canonical}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/,`$1${canonical}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/,`$1${p.name} | Nikhil Yarra$2`)
  .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/,`$1${p.description}$2`);
 await writeFile(resolve(dir,'index.html'),page);
}
console.log('Generated three directly addressable case-study pages.');

await writeFile(resolve(root,'dist/.nojekyll'),'');
await copyFile(resolve(root,'README.md'),resolve(root,'dist/README.md'));
await copyFile(resolve(root,'docs/BLACK-PARTICLE-LAYOUT-AUDIT.md'),resolve(root,'dist/DESIGN-AND-QA.md'));
