"""Refresh the bounded OpenStreetMap extract used by the atlas.
Run manually; build and page visits never query Overpass.
Data © OpenStreetMap contributors, ODbL 1.0. See public/data/README.md.
"""
import requests, json, pathlib, datetime
bbox='34.60,72.05,35.82,72.85'
query=f'[out:json][timeout:90];(way[waterway="river"]({bbox});way[natural="water"]({bbox});way[highway~"^(primary|secondary)$"]({bbox}););out geom;'
r=requests.post('https://overpass.kumi.systems/api/interpreter',data={'data':query},headers={'User-Agent':'SWATFieldGuide/1.0 educational geographic atlas'},timeout=120)
r.raise_for_status();data=r.json()
features=[]
for el in data.get('elements',[]):
 coords=[[round(p['lon'],6),round(p['lat'],6)] for p in el.get('geometry',[])]
 if len(coords)<2:continue
 t=el.get('tags',{});kind='river' if t.get('waterway')=='river' else 'stream' if t.get('waterway') else 'road' if t.get('highway') else 'water' if t.get('natural')=='water' else 'forest'
 polygon=kind in ('water','forest') and coords[0]==coords[-1] and len(coords)>3
 if kind in ('water','forest') and not polygon:continue
 features.append({'type':'Feature','properties':{'osm_id':el['id'],'kind':kind,'name':t.get('name:en',t.get('name',''))},'geometry':{'type':'Polygon' if polygon else 'LineString','coordinates':[coords] if polygon else coords}})
out={'type':'FeatureCollection','attribution':'© OpenStreetMap contributors, ODbL 1.0','source':'https://overpass.kumi.systems/api/interpreter','osm_timestamp':data.get('osm3s',{}).get('timestamp_osm_base'),'bbox':[72.05,34.60,72.85,35.82],'features':features}
pathlib.Path('public/data/swat-osm.geojson').write_text(json.dumps(out,separators=(',',':')))
pathlib.Path('docs/production/overpass-query.txt').write_text(query)
print('Saved',len(features),'features',pathlib.Path('public/data/swat-osm.geojson').stat().st_size,'bytes',out['osm_timestamp'])
