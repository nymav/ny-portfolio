import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import * as data from '../src/content.ts';
const root=resolve(import.meta.dirname,'..');
const content=await readFile(resolve(root,'src/content.ts'),'utf8');
assert.equal(new Set(data.projects.map(p=>p.id)).size,3);
assert.equal(data.outputs.length,2);
assert.equal(data.profile.email,'nikhilyarra.mail@gmail.com');
for(const p of data.projects){
 for(const key of ['question','implementation','validation','limit','repository','evidence']) assert.ok(p[key]?.length,`${p.id}: missing ${key}`);
 assert.equal(new URL(p.repository).hostname,'github.com');
 assert.equal(new URL(p.evidence).hostname,'github.com');
}
const app=(await Promise.all(['App.tsx','Experience.tsx','ProjectArtifact.tsx','styles.css'].map(f=>readFile(resolve(root,'src',f),'utf8')))).join('\n');
assert.ok(!/[\u2190-\u21ff\u27f0-\u27ff]/u.test(app+content),'Arrow glyph in authored interface');
for(const file of [...data.projects.map(p=>`work/${p.id}/index.html`)]) assert.ok((await stat(resolve(root,'dist',file))).size>100,file);
const html=await readFile(resolve(root,'dist/index.html'),'utf8');
const assets=[...html.matchAll(/(?:src|href)="(\/ny-portfolio\/[^"?#]+)"/g)].map(m=>m[1]);
assert.ok(assets.some(a=>a.endsWith('.js')));
for(const asset of assets)assert.ok((await stat(resolve(root,'dist',asset.slice('/ny-portfolio/'.length)))).isFile(),asset);
for(const filename of ['Nikhil_Yarra_CV.pdf','404.html','fonts/ibm-plex-sans.ttf','fonts/instrument-serif.ttf'])assert.ok((await stat(resolve(root,'dist',filename))).isFile());
const pdf=await readFile(resolve(root,'dist/Nikhil_Yarra_CV.pdf'));
assert.equal(pdf.subarray(0,4).toString(),'%PDF');
const bundled=await readdir(resolve(root,'dist/assets'));
const css=await readFile(resolve(root,'dist/assets',bundled.find(n=>n.endsWith('.css'))),'utf8');
assert.ok(css.includes('/ny-portfolio/fonts/ibm-plex-sans.ttf'),'Font path must respect Pages base');
assert.ok(!/Questions worth|Good work starts|ENGINEERING, WITH CURIOSITY/.test(app),'Retired promotional headings');
for(const p of data.projects){const page=await readFile(resolve(root,'dist/work',p.id,'index.html'),'utf8');assert.ok(page.includes(`<title>${p.name} | Nikhil Yarra</title>`));assert.ok(page.includes(`https://nymav.github.io/ny-portfolio/work/${p.id}/`));}
console.log('PASS: project evidence fields, contact, authored glyphs, Pages paths, fonts, CV and recovery page');
