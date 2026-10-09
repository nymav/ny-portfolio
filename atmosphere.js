// Ambient artwork motion uses compositor transforms, with no WebGL startup cost.
(() => {
  const hero=document.querySelector('.hero');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=true;
  function sync(){hero.classList.toggle('motion-active',visible&&!document.hidden&&!reduced.matches)}
  if('IntersectionObserver' in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()}).observe(hero);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
})();
