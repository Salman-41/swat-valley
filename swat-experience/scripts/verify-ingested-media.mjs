import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const record=JSON.parse(await readFile('docs/expansion-islampur-evidence.json','utf8'));
for(const field of ['author','source','license','licenseUrl','downloadUrl','rightsEvidence','locationEvidence','changes','sha256'])if(!record[field])throw new Error(`Missing provenance: ${field}`);
if(record.license!=='CC BY-SA 4.0'||!record.productionApproved)throw new Error('Asset is not approved for this publication');
const original=await readFile(`assets/originals/${record.filename}`);
if(createHash('sha256').update(original).digest('hex')!==record.sha256)throw new Error('Original checksum mismatch');
for(const width of [480,960,1600,2400])for(const type of ['jpg','webp','avif'])await readFile(`public/images/${record.id}-${width}.${type}`);
console.log('Verified Islampur provenance fields, original checksum and 12 responsive derivatives.');
