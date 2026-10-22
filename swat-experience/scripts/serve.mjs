// Foreground static server for repeatable production QA. Astro preview may daemonize.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const port=Number(process.argv[process.argv.indexOf('--port')+1])||4391;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.avif':'image/avif','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.ttf':'font/ttf','.pbf':'application/x-protobuf','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method??'')){res.writeHead(405);res.end();return;}
 try{
  const path=decodeURIComponent(new URL(req.url??'/',`http://127.0.0.1:${port}`).pathname);
  let file=resolve(root,'.'+path);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  let status=200;
  try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');await stat(file);}catch{file=resolve(root,'404.html');status=404;}
  const buffer=await readFile(file);res.writeHead(status,{'Content-Type':types[extname(file)]??'application/octet-stream','Content-Length':buffer.length,'X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:buffer);
 }catch{res.writeHead(400);res.end('Bad request');}
});
server.listen(port,'127.0.0.1',()=>console.log(`SWAT production QA: http://127.0.0.1:${port}`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
