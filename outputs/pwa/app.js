'use strict';
(() => {
  // Namespace by path: GitHub Pages repositories on the same host share storage.
  const base = new URL('./', location.href);
  const key = 'ud-profile-v1:' + base.pathname;
  const defaults = {name:'',document:'',blood:'',code:'',program:'',role:'Estudiante',plate:''};
  const limits = {name:80,document:25,blood:4,code:30,program:70,role:30,plate:10};
  const clean = value => Object.fromEntries(Object.keys(defaults).map(field =>
    [field, typeof value?.[field] === 'string' ? value[field].slice(0,limits[field]) : defaults[field]]));
  let profile = {...defaults};
  try { profile = clean(JSON.parse(localStorage.getItem(key))); } catch {}
  const put = (selector, value) => { document.querySelector(selector).textContent = value; };
  function render() {
    put('.idtext .name',profile.name || 'Tu nombre');
    put('.idtext .line', 'CC: ' + (profile.document || '—') + ' / RH: ' + (profile.blood || '—'));
    put('.idtext .line:nth-of-type(3)', 'Código estudiantil: ' + (profile.code || '—'));
    put('.degree',profile.program || 'Programa académico');
    put('.pill',profile.role || 'Estudiante');
    put('.plate',profile.plate || '—');
  }
  render();
  const dialog = document.querySelector('#editor');
  const form = document.querySelector('#profile-form');
  function openEditor() {
    if (dialog.open) return;
    for (const field of Object.keys(defaults)) form.elements.namedItem(field).value = profile[field];
    put('#save-error','');
    dialog.showModal();
  }
  const logo = document.querySelector('.brand');
  let timer;
  let origin;
  function cancelHold() { clearTimeout(timer); origin = null; }
  logo.addEventListener('pointerdown', event => {
    cancelHold();
    if (!event.isPrimary || event.button !== 0) return;
    origin = {x:event.clientX,y:event.clientY};
    timer = setTimeout(() => { cancelHold(); openEditor(); },3000);
  });
  logo.addEventListener('pointermove', event => {
    if (origin && Math.hypot(event.clientX-origin.x,event.clientY-origin.y)>12) cancelHold();
  });
  for (const event of ['pointerup','pointercancel','pointerleave']) logo.addEventListener(event,cancelHold);
  window.addEventListener('blur',cancelHold);
  document.addEventListener('visibilitychange',cancelHold);
  logo.addEventListener('contextmenu',event => event.preventDefault());
  logo.addEventListener('keydown',event => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) { event.preventDefault(); openEditor(); }
  });
  document.querySelector('#cancel').addEventListener('click',() => dialog.close());
  form.addEventListener('submit',event => {
    event.preventDefault();
    const next = clean(Object.fromEntries(new FormData(form)));
    for (const field of Object.keys(next)) next[field] = next[field].trim();
    next.plate = next.plate.toUpperCase();
    try { localStorage.setItem(key,JSON.stringify(next)); }
    catch { put('#save-error','No se pudieron guardar los datos. Comprueba que el almacenamiento esté permitido.'); return; }
    profile = next;
    render();
    dialog.close();
  });
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register(new URL('sw.js',base),{scope:base.pathname}).catch(console.warn);
  }
})();
