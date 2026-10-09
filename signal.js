(() => {
  const dialog=document.querySelector('#study'),body=document.querySelector('.study-body'),close=document.querySelector('.close');
  let trigger;
  function element(tag,text,className){const e=document.createElement(tag);if(text)e.textContent=text;if(className)e.className=className;return e}
  function link(label,url){const e=element('a',label+' ↗');e.href=url;e.target='_blank';e.rel='noopener';return e}
  document.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>{
    const p=window.catalogueProjects[Number(button.dataset.study)];if(!p)return;trigger=button;
    document.querySelector('.study-label').textContent=p.category+' / '+p.status;
    document.querySelector('#study-title').textContent=p.name;
    document.querySelector('.study-description').textContent=p.summary;
    body.replaceChildren();
    const figure=element('figure',null,'study-evidence'),image=element('img');image.src='assets/evidence/'+p.image+'.webp';image.alt=p.caption;image.width=1280;image.height=720;figure.append(image,element('figcaption',p.caption));body.append(figure);
    for(const [title,copy] of [['Purpose',p.purpose],['Implementation',p.implementation],['Evidence',p.evidence],['Scope',p.boundary]]){const section=element('section');section.append(element('h3',title),element('p',copy));body.append(section)}
    const architecture=element('section',null,'architecture'),list=element('ol');architecture.append(element('h3','Architecture'));
    p.flow.forEach(([title,copy,file],i)=>{const item=element('li');item.append(element('span',String(i+1).padStart(2,'0'),'node-number'),element('h4',title),element('p',copy),link('Source','https://github.com/nymav/'+p.repo+'/blob/'+p.sha+'/'+file));list.append(item)});architecture.append(list);body.append(architecture);
    const sources=element('div',null,'study-sources');sources.append(element('h3','Repository'),link(p.name,'https://github.com/nymav/'+p.repo));body.append(sources);
    dialog.showModal();document.body.style.overflow='hidden';close.focus();dialog.scrollTop=0;
  }));
  dialog.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const controls=[...dialog.querySelectorAll('button:not([disabled]),a[href]')].filter(e=>e.getClientRects().length);if(!controls.length)return;event.preventDefault();const i=controls.indexOf(document.activeElement);controls[(i+(event.shiftKey?-1:1)+controls.length)%controls.length].focus()});
  close.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus({preventScroll:true})});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close()});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('arrived');observer.unobserve(entry.target)}}),{threshold:.08});
  document.querySelectorAll('.section-heading,.catalogue-card,.about-copy,.portrait,.roles article,.teyrin-layout,.contact h2').forEach(e=>observer.observe(e));
})();
