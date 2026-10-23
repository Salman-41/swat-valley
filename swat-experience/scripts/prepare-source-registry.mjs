import {readFile,writeFile,mkdir} from 'node:fs/promises';
const seeds=JSON.parse(await readFile(new URL('../docs/swat-expansion/data/SOURCE_REGISTRY_SEED.json',import.meta.url),'utf8'));
let existing=[];try{existing=JSON.parse(await readFile('src/data/research/source-registry.json','utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
const ids=new Set();
const records=seeds.map(seed=>{
 if(!seed.id||ids.has(seed.id))throw new Error(`Missing or duplicate source ID: ${seed.id}`);
 ids.add(seed.id);
 if(new URL(seed.source_url).protocol!=='https:')throw new Error(`Insecure source: ${seed.id}`);
 const reviewed=existing.find(record=>record.id===seed.id&&record.status==='approved'&&record.verification_evidence?.length);
 if(reviewed)return reviewed;
 return {...seed,seed_production_approved:seed.production_approved,production_approved:false,status:'discovery',verification_evidence:[],blockers:['Exact item rights require independent verification','Local asset and checksum not verified']};
});
await mkdir('src/data/research',{recursive:true});
await writeFile('src/data/research/source-registry.json',JSON.stringify(records,null,2)+'\n');
console.log(`${records.length} records staged; ${records.filter(r=>r.production_approved).length} previously reviewed approvals preserved.`);
