import re,json,requests,concurrent.futures
from pathlib import Path
urls=list(dict.fromkeys(re.findall(r'(?:url|source|licenseUrl):\s*[\'\"](https?://[^\'\"]+)',Path('src/data/sources.ts').read_text()+Path('src/data/photos.ts').read_text())))
def check(url):
 try:
  r=requests.get(url,timeout=18,stream=True,headers={'User-Agent':'SWAT-Editorial-Source-Review/1.0'});result={'url':url,'status':r.status_code,'finalUrl':r.url};r.close();return result
 except requests.RequestException as e:return {'url':url,'error':str(e)[:160]}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:results=list(pool.map(check,urls))
Path('docs/audit/source-link-status.json').write_text(json.dumps(results,indent=2)+'\n')
print('Checked',len(results),'source URLs');print(json.dumps([r for r in results if r.get('status',999)>=400],indent=2))
