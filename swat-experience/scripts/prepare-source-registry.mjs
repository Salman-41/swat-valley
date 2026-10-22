import {readFile,writeFile,mkdir} from 'node:fs/promises';
const seeds=JSON.parse(await readFile(new URL('../docs/swat-expansion/data/SOURCE_REGISTRY_SEED.json',import.meta.url),'utf8'));
const ids=new Set();
const records=seeds.map(seed=>{
 if(!seed.id||ids.has(seed.id))throw new Error(`Missing or duplicate source ID: ${seed.id}`);
 ids.add(seed.id);
 if(new URL(seed.source_url).protocol!=='https:')throw new Error(`Insecure source: ${seed.id}`);
 return {...seed,seed_production_approved:seed.production_approved,production_approved:false,status:'discovery',verification_evidence:[],blockers:['Exact item rights require independent verification','Local asset and checksum not verified']};
});
await mkdir('src/data/research',{recursive:true});
await writeFile('src/data/research/source-registry.json',JSON.stringify(records,null,2)+'\n');
console.log(`${records.length} discovery records staged; none approved for publication.`);
