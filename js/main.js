/* helpers */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

/* footer year */
(() => { const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); })();

/* mobile nav */
(() => {
  const btn = $('#navToggle');
  const menu = $('#primary-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', () => {
    const exp = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!exp));
    menu.classList.toggle('show');
  });
})();

/* smooth scroll for in-page links */
(() => {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu after click
      const menu = $('#primary-menu');
      if(menu && menu.classList.contains('show')) menu.classList.remove('show');
      const btn = $('#navToggle');
      if(btn) btn.setAttribute('aria-expanded','false');
    });
  });
})();

/* testimonials carousel */
(() => {
  const items = $$('.t');
  const dots = $$('.t-dots .dot');
  if(!items.length) return;
  let idx = 0, timer;
  const show = (n) => {
    items[idx].classList.remove('current');
    dots[idx]?.classList.remove('active');
    idx = (n + items.length) % items.length;
    items[idx].classList.add('current');
    dots[idx]?.classList.add('active');
  };
  dots.forEach((d,i)=> d.addEventListener('click', () => { clearInterval(timer); show(i); auto(); }));
  const auto = () => timer = setInterval(()=>show(idx+1), 6000);
  auto();
})();