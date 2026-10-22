import {readFile,readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
async function walk(directory){const files=[];for(const name of await readdir(directory)){const path=join(directory,name);if((await stat(path)).isDirectory())files.push(...await walk(path));else files.push(path);}return files;}
const files=await walk('dist');const htmlFiles=files.filter(file=>file.endsWith('.html'));const errors=[];let links=0;
for(const file of htmlFiles){const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)){const raw=match[1];if(!raw?.startsWith('/'))continue;const url=new URL(raw,'https://swat.invalid');let path=join('dist',decodeURIComponent(url.pathname));if(url.pathname.endsWith('/'))path=join(path,'index.html');links++;try{await stat(path);if(url.hash&&path.endsWith('.html')){const target=await readFile(path,'utf8');if(!target.includes(`id="${url.hash.slice(1)}"`))errors.push(`${file}: missing anchor ${raw}`);}}catch{errors.push(`${file}: missing ${raw}`);}}
 const headings=[...html.matchAll(/<h1(?:\s[^>]*)?>/g)];if(headings.length!==1)errors.push(`${file}: ${headings.length} h1 headings`);
 if(html.includes('src=""'))errors.push(`${file}: empty image source`);
}
const manifest=JSON.parse(await readFile('src/data/image-manifest.json','utf8'));
for(const photo of manifest)for(const width of photo.widths)for(const format of ['avif','webp','jpg'])if(!files.includes(`dist/images/${photo.id}-${width}.${format}`))errors.push(`Missing derivative ${photo.id}-${width}.${format}`);
if(files.some(file=>file.includes('/originals/')))errors.push('Original source photos should not ship in dist.');
const provenance=JSON.parse(await readFile('public/data/map-provenance.json','utf8'));if(files.filter(file=>file.endsWith('.pbf')).length!==provenance.tiles)errors.push('Map tile manifest count mismatch.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Validated ${htmlFiles.length} HTML routes, ${links} local links/assets, ${manifest.length} responsive photo families and ${provenance.tiles} licensed map tiles.`);
