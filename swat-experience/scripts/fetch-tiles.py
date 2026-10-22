"""Bounded OpenFreeMap extract. OSM data: ODbL 1.0. Max 3 requests concurrently."""
import requests,math,json,time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path('public/data/tiles')
BBOX=[71.8,34.4,73.1,36.0]
def tile(lon,lat,z):
 n=2**z
 return int((lon+180)/360*n),int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n)
headers={'User-Agent':'SWAT-Research-Atlas/1.0 (bounded offline extract; educational prototype)'}
meta=requests.get('https://tiles.openfreemap.org/planet',headers=headers,timeout=45);meta.raise_for_status();template=meta.json()['tiles'][0]
tiles=[]
for z in range(7,11):
 xmin,ymin=tile(BBOX[0],BBOX[3],z);xmax,ymax=tile(BBOX[2],BBOX[1],z)
 for x in range(xmin,xmax+1):
  for y in range(ymin,ymax+1):tiles.append((z,x,y))
assert len(tiles)<3000
print('Fetching',len(tiles),'tiles',flush=True)
def fetch(t):
 z,x,y=t;path=ROOT/str(z)/str(x)/f'{y}.pbf';path.parent.mkdir(parents=True,exist_ok=True)
 if path.exists():return path.stat().st_size
 url=template.format(z=z,x=x,y=y)
 for attempt in range(3):
  try:
   r=requests.get(url,headers=headers,timeout=45);r.raise_for_status();path.write_bytes(r.content);return len(r.content)
  except requests.RequestException:
   if attempt==2:raise
   time.sleep(1)
with ThreadPoolExecutor(max_workers=3) as pool:sizes=list(pool.map(fetch,tiles))
assert sum(sizes)<50*1024*1024
record={'source':template,'retrieved':time.strftime('%Y-%m-%d'),'bounds':BBOX,'zoom':[7,10],'tiles':len(tiles),'bytes':sum(sizes),'license':'ODbL 1.0','attribution':'© OpenStreetMap contributors; OpenFreeMap; OpenMapTiles','licenseUrl':'https://www.openstreetmap.org/copyright'}
Path('public/data/map-provenance.json').write_text(json.dumps(record,indent=2)+'\n');print(record)
