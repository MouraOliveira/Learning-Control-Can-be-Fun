/* Small floating navigation added to every lab: Home + previous/next lab.
   Needs ../assets/labs.js loaded first. Safe to include in any new lab. */
(function(){
  var labs = window.LABS || [];
  var here = decodeURIComponent(location.pathname.split('/').pop());
  var i = labs.findIndex(function(l){ return l.file.split('/').pop() === here; });
  var prev = i > 0 ? labs[i-1] : null, next = i >= 0 && i < labs.length-1 ? labs[i+1] : null;

  var css = document.createElement('style');
  css.textContent =
  '.lcf-nav{position:fixed;right:max(12px,env(safe-area-inset-right,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));z-index:2147483000;display:flex;align-items:center;gap:2px;padding:3px;border-radius:999px;font:600 13px/1 system-ui,-apple-system,"Segoe UI",sans-serif;background:#0e1b33;color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.28);opacity:.85;transition:opacity .15s}'+
  '.lcf-nav:hover,.lcf-nav:focus-within{opacity:1}'+
  '.lcf-nav a{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 11px;border-radius:999px;color:inherit;text-decoration:none;white-space:nowrap}'+
  '.lcf-nav a:hover{background:rgba(255,255,255,.16)}'+
  '.lcf-nav a:focus-visible{outline:2px solid #ffb23e;outline-offset:1px}'+
  '.lcf-nav .lcf-x{display:none}'+
  '.lcf-nav:hover .lcf-x,.lcf-nav:focus-within .lcf-x{display:inline-flex}'+
  '@media(hover:none){.lcf-nav .lcf-x{display:inline-flex}}'+
  '@media print{.lcf-nav{display:none}}';
  document.head.appendChild(css);

  var nav = document.createElement('nav');
  nav.className = 'lcf-nav';
  nav.setAttribute('aria-label','Laboratory navigation');
  var h = '';
  if (prev) h += '<a class="lcf-x" href="../'+prev.file+'" title="Previous lab: '+prev.title+'" aria-label="Previous lab: '+prev.title+'">‹ Prev</a>';
  h += '<a href="../index.html#labs" title="Back to all laboratories"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7.5 8 2l6 5.5M3.5 6.5V14h9V6.5"/></svg>All labs</a>';
  if (next) h += '<a class="lcf-x" href="../'+next.file+'" title="Next lab: '+next.title+'" aria-label="Next lab: '+next.title+'">Next ›</a>';
  nav.innerHTML = h;
  document.body.appendChild(nav);
})();
