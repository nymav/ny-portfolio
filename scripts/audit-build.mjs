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
const app=await readFile(resolve(root,'src/App.tsx'),'utf8');
assert.ok(!/[\u2190-\u21ff\u27f0-\u27ff]/u.test(app+content),'Arrow glyph in authored interface');
assert.ok(!/<(?:video|canvas)\b/.test(app),'Background media in current interface');
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
assert.ok(!bundled.some(n=>/film|cinematic/.test(n)));
console.log('PASS: project evidence fields, contact, authored glyphs, Pages paths, fonts, CV and recovery page');
