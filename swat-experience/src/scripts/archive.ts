const form=document.querySelector<HTMLFormElement>('#archive-search');
if(form){
 const query=form.elements.namedItem('q') as HTMLInputElement;
 const subject=form.elements.namedItem('subject') as HTMLSelectElement;
 const records=Array.from(document.querySelectorAll<HTMLElement>('[data-record]'));
 const pager=document.querySelector<HTMLElement>('.archive-pagination')!;
 const previous=document.querySelector<HTMLButtonElement>('#archive-prev')!;
 const next=document.querySelector<HTMLButtonElement>('#archive-next')!;
 let page=1;const size=6;
 function render(push=false){
  const needle=query.value.trim().toLocaleLowerCase();
  const matches=records.filter(r=>(r.dataset.search||'').includes(needle)&&(!subject.value||r.dataset.subject===subject.value));
  const pages=Math.max(1,Math.ceil(matches.length/size));page=Math.max(1,Math.min(page,pages));
  records.forEach(r=>r.hidden=true);matches.slice((page-1)*size,page*size).forEach(r=>r.hidden=false);
  document.querySelector('#archive-count')!.textContent=`${matches.length} photograph${matches.length===1?'':'s'}`;
  (document.querySelector('#archive-empty') as HTMLElement).hidden=matches.length>0;
  pager.hidden=pages<=1;previous.disabled=page===1;next.disabled=page===pages;
  document.querySelector('#archive-page')!.textContent=`Page ${page} of ${pages}`;
  if(push){const url=new URL(location.href);url.search='';if(query.value)url.searchParams.set('q',query.value);if(subject.value)url.searchParams.set('subject',subject.value);if(page>1)url.searchParams.set('page',String(page));history.pushState(null,'',url);}
 }
 function restore(){const p=new URLSearchParams(location.search);query.value=p.get('q')||'';subject.value=p.get('subject')||'';page=Number(p.get('page'))||1;render();}
 form.addEventListener('submit',e=>{e.preventDefault();page=1;render(true);});
 query.addEventListener('input',()=>{page=1;render(true);});subject.addEventListener('change',()=>{page=1;render(true);});
 form.addEventListener('reset',()=>{query.value='';subject.value='';page=1;render(true);});
 previous.addEventListener('click',()=>{page--;render(true);document.querySelector('#archive-count')?.scrollIntoView();});
 next.addEventListener('click',()=>{page++;render(true);document.querySelector('#archive-count')?.scrollIntoView();});
 window.addEventListener('popstate',restore);restore();
}
