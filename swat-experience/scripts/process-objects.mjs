import sharp from 'sharp';import {readFile,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
const manifest=[];
for(const [id,metId] of [['dipankara',49809],['marine-deity',38789]]){
 const api=JSON.parse(await readFile(`docs/objects/met-${metId}.json`));if(api.isPublicDomain!==true)throw new Error(`Rights gate: ${id}`);
 const input=`assets/objects/${id}.jpg`;const original=await readFile(input);const metadata=await sharp(original).metadata();
 for(const width of [480,960,1600]){const image=sharp(original).rotate().resize({width,withoutEnlargement:true});await Promise.all([image.clone().webp({quality:85}).toFile(`public/objects/${id}-${width}.webp`),image.clone().jpeg({quality:88}).toFile(`public/objects/${id}-${width}.jpg`)]);}
 manifest.push({id,metId,source:`https://www.metmuseum.org/art/collection/search/${metId}`,download:api.primaryImage,isPublicDomain:true,verifiedOn:'2026-10-23',sha256:createHash('sha256').update(original).digest('hex'),width:metadata.width,height:metadata.height,derivativeWidths:[480,960,1600],changes:'Resize and compression only; full image retained',inspection:'Original visually inspected; no reconstruction; catalogue uncertainty retained',evidence:`docs/objects/met-${metId}.json`});
}
await writeFile('docs/objects/manifest.json',JSON.stringify(manifest,null,2)+'\n');
