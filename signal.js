(() => {
  const dialog = document.querySelector('#study');
  const body = document.querySelector('.study-body');
  const close = document.querySelector('.close');
  let trigger;
  document.querySelectorAll('[data-study]').forEach(button => {
    button.addEventListener('click', () => {
      const study = window.verifiedCaseStudies[Number(button.dataset.study)];
      if (!study) return;
      trigger = button;
      document.querySelector('.study-label').textContent = study.label;
      document.querySelector('#study-title').textContent = study.title;
      document.querySelector('.study-description').textContent = study.description;
      body.replaceChildren();
      const key=study.title.split(' — ')[0];
      const evidence=window.caseEvidence?.[key];
      if(evidence?.images.length){
        const gallery=document.createElement('div');gallery.className='study-evidence';
        for(const item of evidence.images){
          const figure=document.createElement('figure'),image=document.createElement('img'),caption=document.createElement('figcaption');
          image.src=item.src.replace(/\.png$/,'.webp');image.alt=item.caption;image.loading='lazy';
          const dimensions={'mailayer-interface':[1440,1000],'drax-interface':[1280,720],'workflow':[1756,1090],'output':[1712,824]};
          const name=item.src.split('/').pop().replace('.png','');
          const size=dimensions[name]||[1440,1000];image.width=size[0];image.height=size[1];
          caption.textContent=item.caption;figure.append(image,caption);gallery.append(figure);
        }
        body.append(gallery);
      }
      study.sections.forEach(([title, copy]) => {
        const section = document.createElement('section');
        const heading = document.createElement('h3');
        const paragraph = document.createElement('p');
        heading.textContent = title;
        paragraph.textContent = copy;
        section.append(heading, paragraph);
        body.append(section);
      });
      const source = document.createElement('a');
      source.href = study.url;
      source.target = '_blank';
      source.rel = 'noopener';
      source.textContent = 'Explore the source ↗';
      const sources=document.createElement('div');sources.className='study-sources';
      const sourceHeading=document.createElement('h3');sourceHeading.textContent='Implementation sources';sources.append(sourceHeading);
      for(const [label,url] of evidence?.links||[]){const link=document.createElement('a');link.href=url;link.textContent=label+' ↗';link.target='_blank';link.rel='noopener';sources.append(link)}
      sources.append(source);body.append(sources);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      close.focus();
      dialog.scrollTop = 0;
    });
  });
  dialog.addEventListener('keydown', event => {
    if(event.key !== 'Tab') return;
    const focusable=[...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')].filter(element=>element.getClientRects().length);
    if(!focusable.length)return;
    event.preventDefault();
    const index=focusable.indexOf(document.activeElement);
    const next=index<0?(event.shiftKey?focusable.length-1:0):(index+(event.shiftKey?-1:1)+focusable.length)%focusable.length;
    focusable[next].focus();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    trigger?.focus({preventScroll: true});
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();

// Pointer previews are an enhancement; selecting a row reveals the same evidence.
(() => {
  const preview=document.querySelector('.floating-preview'),image=preview.querySelector('img'),caption=preview.querySelector('span');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active,keyboard=false;
  function position(x,y){preview.style.left=Math.max(190,Math.min(innerWidth-190,x))+'px';preview.style.top=Math.max(170,Math.min(innerHeight-170,y))+'px'}
  function show(row,x,y){if(!matchMedia('(min-width: 701px)').matches||row.querySelector('.project-trigger').getAttribute('aria-expanded')==='true')return;active=row;image.src=row.dataset.preview;caption.textContent=row.dataset.caption;position(x,y);preview.classList.add('visible')}
  function hide(){active=null;preview.classList.remove('visible')}
  document.querySelectorAll('.project-row').forEach(row=>{
    const trigger=row.querySelector('.project-trigger'),panel=row.querySelector('.project-expand');
    trigger.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){keyboard=false;show(row,event.clientX,event.clientY)}});
    trigger.addEventListener('pointermove',event=>{if(active===row&&!reduced.matches)position(event.clientX,event.clientY)});
    trigger.addEventListener('pointerleave',hide);
    trigger.addEventListener('focus',()=>{keyboard=true;const r=trigger.getBoundingClientRect();show(row,innerWidth*.72,r.top+r.height*.5)});
    trigger.addEventListener('blur',hide);
    trigger.addEventListener('click',()=>{const opened=trigger.getAttribute('aria-expanded')==='true';trigger.setAttribute('aria-expanded',String(!opened));panel.hidden=opened;hide()});
  });
  document.addEventListener('scroll',()=>{if(keyboard&&active){const r=active.querySelector('.project-trigger').getBoundingClientRect();position(innerWidth*.72,r.top+r.height*.5)}else hide()},{passive:true});window.addEventListener('resize',hide);
})();

// Content is always readable; entrances add motion only after it reaches view.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('arrived');observer.unobserve(entry.target)}})},{threshold:.12});
  document.querySelectorAll('.section-heading,.approach h2,.approach-list article,.about-copy,.portrait,.roles article,.contact h2').forEach(element=>observer.observe(element));
})();
