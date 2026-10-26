(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var LABS = window.LABS || [];
  var NS = 'http://www.w3.org/2000/svg';

  /* ---------- thumbnails (240 x 120 viewBox) ---------- */
  function pts(fn, x0, x1, n){ var s='', i, x; for(i=0;i<=n;i++){ x=x0+(x1-x0)*i/n; s+=(i?'L':'M')+x.toFixed(1)+' '+fn(x).toFixed(1); } return s; }
  function path(d, cls){ return '<path class="ln '+(cls||'')+'" pathLength="1" d="'+d+'"/>'; }
  var PREVIEW = {
    step2: function(){
      var z=.32, wd=Math.sqrt(1-z*z), ph=Math.acos(z);
      var y=function(t){ return 1-Math.exp(-z*t)/wd*Math.sin(wd*t+ph); };
      return '<path class="ax" d="M20 100H224M20 14V100"/><path class="dash" d="M20 38H224"/>'+
        path(pts(function(x){ return 100-62*y((x-20)/204*13); },20,224,110));
    },
    poles: function(){
      var cx=150, cy=60, s='<rect class="zone" x="'+cx+'" y="8" width="84" height="104"/><path class="ax" d="M10 '+cy+'H232M'+cx+' 8V112"/>';
      [[-2,0],[-1,0],[0,0]].forEach(function(p){ var x=cx+p[0]*40; s+='<path class="px" d="M'+(x-4)+' '+(cy-4)+'l8 8m0-8l-8 8"/>'; });
      s+=path('M'+(cx-40)+' '+cy+'C'+(cx-30)+' '+(cy-8)+' '+(cx-24)+' '+(cy-22)+' '+(cx+8)+' '+(cy-52),'b');
      s+=path('M'+(cx-40)+' '+cy+'C'+(cx-30)+' '+(cy+8)+' '+(cx-24)+' '+(cy+22)+' '+(cx+8)+' '+(cy+52),'b');
      s+=path('M'+(cx-80)+' '+cy+'H'+(cx-40),'b');
      s+='<circle class="pd" cx="'+(cx-16)+'" cy="'+(cy-24)+'" r="4.5"/><circle class="pd" cx="'+(cx-16)+'" cy="'+(cy+24)+'" r="4.5"/>';
      return s;
    },
    ramp: function(){
      return '<path class="ax" d="M20 104H224M20 14V104"/>'+
        '<path class="dash" d="M20 100L214 22"/>'+
        path('M20 104C60 104 80 100 100 90S150 66 214 38','c')+
        '<path class="ax" d="M214 22V38" style="stroke:var(--mute)"/>';
    },
    pid: function(){
      var yy=function(x){ var t=(x-60)/12; if(x<60) return 100; var v=1-Math.exp(-.35*t)*Math.cos(.55*t); if(x>150){ var u=(x-150)/14; v=1.04-.4*Math.exp(-.6*u)*(1-Math.exp(-u*1.2))*2.2+.0; v=Math.min(1.04,v);} return 100-62*Math.max(0,v); };
      return '<path class="ax" d="M20 104H224M20 14V104"/>'+
        '<path class="dash" d="M20 100H60V38H224"/>'+
        path(pts(yy,20,224,120));
    },
    ff: function(){
      return '<path class="ax" d="M20 104H224M20 14V104"/><path class="dash" d="M20 100H80V84H224"/>'+
        path('M20 56H80C86 36 96 34 110 44S140 58 224 56','c')+
        path('M20 56H80C84 52 90 52 100 55S130 56 224 56','b')+
        '<path class="ax" d="M80 14V104" style="stroke-dasharray:3 4"/>';
    },
    pidx: function(){
      var s='<path class="ax" d="M20 62H224M20 8V112"/>';
      s+='<path class="dash" d="M20 52H64V22H224"/>';
      s+=path(pts(function(x){ if(x<64) return 52; var t=(x-64)/12; return 52-30*(1-Math.exp(-.45*t)*Math.cos(.6*t)); },20,224,100));
      s+=path('M20 108H64L66 70C80 80 96 100 120 106S200 108 224 108','b');
      s+=path('M20 108H64C70 90 90 82 224 82','c');
      return s;
    }
  };

  /* ---------- cards ---------- */
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function card(l){
    var thumb = '<svg class="thumb" viewBox="0 0 240 120" aria-hidden="true" focusable="false">'+(PREVIEW[l.preview]||PREVIEW.step2)()+'</svg>';
    return '<article class="card" data-id="'+esc(l.id)+'">'+thumb+
      '<div class="card-body">'+
        '<div class="meta"><span class="level" data-l="'+esc(l.level)+'"><i></i>'+esc(l.level)+'</span></div>'+
        '<h3>'+esc(l.title)+'</h3>'+
        '<p>'+esc(l.summary)+'</p>'+
        '<div class="goals-h">What you will practise</div>'+
        '<ul class="goals">'+l.objectives.map(function(o){ return '<li>'+esc(o)+'</li>'; }).join('')+'</ul>'+
        '<div class="tags">'+l.tags.map(function(t){ return '<span class="tag">'+esc(t)+'</span>'; }).join('')+'</div>'+
        '<a class="btn primary" href="'+esc(l.file)+'" aria-label="Launch lab: '+esc(l.title)+'">Launch lab</a>'+
      '</div></article>';
  }
  var soon = '<article class="card soon"><svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="16" cy="16" r="12"/><path d="M16 10v12M10 16h12"/></svg><h3>More labs on the way</h3><p>Frequency response, root locus design and state-space control are natural next steps.</p></article>';

  var level = 'All', query = '';
  var levels = ['All'].concat(['Introductory','Intermediate','Advanced'].filter(function(l){ return LABS.some(function(x){ return x.level===l; }); }));

  function matches(l){
    if(level!=='All' && l.level!==level) return false;
    if(!query) return true;
    var hay=(l.title+' '+l.summary+' '+l.tags.join(' ')+' '+l.objectives.join(' ')+' '+l.level).toLowerCase();
    return query.toLowerCase().split(/\s+/).every(function(w){ return hay.indexOf(w)>-1; });
  }
  function render(){
    var shown = LABS.filter(matches);
    $('cards').innerHTML = shown.map(card).join('') + (level==='All' && !query ? soon : '');
    $('empty').hidden = shown.length>0;
    $('count').textContent = LABS.length + (LABS.length===1?' laboratory':' laboratories')+' available, with more to come.';
  }
  function chips(){
    $('chips').innerHTML = levels.map(function(l){ return '<button class="chip" type="button" data-l="'+l+'" aria-pressed="'+(l===level)+'">'+l+'</button>'; }).join('');
  }
  $('chips').addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return; level=b.dataset.l; chips(); render();
  });
  $('q').addEventListener('input',function(e){ query=e.target.value.trim(); render(); });
  chips(); render();

  /* ---------- hero: live second-order step response ---------- */
  var W=560,H=300,L=44,R=550,T=14,B=270,TMAX=14,YMAX=1.8;
  var X=function(t){ return L+t/TMAX*(R-L); }, Y=function(v){ return B-v/YMAX*(B-T); };
  function resp(z,t){
    if(z<1){ var wd=Math.sqrt(1-z*z); return 1-Math.exp(-z*t)/wd*Math.sin(wd*t+Math.acos(z)); }
    if(Math.abs(z-1)<1e-9) return 1-(1+t)*Math.exp(-t);
    var q=Math.sqrt(z*z-1), s1=-z+q, s2=-z-q;
    return 1-(s2*Math.exp(s1*t)-s1*Math.exp(s2*t))/(s2-s1);
  }
  // static grid
  (function(){
    var g='', i;
    for(i=0;i<=3;i++){ var v=i*.5; g+='<line class="gl" x1="'+L+'" x2="'+R+'" y1="'+Y(v)+'" y2="'+Y(v)+'"/><text x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+v.toFixed(1)+'</text>'; }
    g+='<line class="gl" x1="'+L+'" x2="'+R+'" y1="'+Y(1.5)+'" y2="'+Y(1.5)+'"/><text x="'+(L-8)+'" y="'+(Y(1.5)+4)+'" text-anchor="end">1.5</text>';
    for(i=0;i<=TMAX;i+=2){ g+='<line class="gl" y1="'+T+'" y2="'+B+'" x1="'+X(i)+'" x2="'+X(i)+'"/><text x="'+X(i)+'" y="'+(B+18)+'" text-anchor="middle">'+i+' s</text>'; }
    $('grid').innerHTML=g;
    $('band').setAttribute('y',Y(1.02)); $('band').setAttribute('height',Y(.98)-Y(1.02));
    $('ref').setAttribute('y1',Y(1)); $('ref').setAttribute('y2',Y(1));
  })();

  var firstDraw = true;
  function hero(){
    var z=+$('zeta').value, n=300, d='', i, t, y, peak=0, ts=0, dt=TMAX/n;
    for(i=0;i<=n;i++){ t=i*dt; y=resp(z,t); peak=Math.max(peak,y); d+=(i?'L':'M')+X(t).toFixed(1)+' '+Y(Math.min(y,YMAX)).toFixed(1); if(Math.abs(y-1)>.02) ts=t; }
    $('curve').setAttribute('d',d);
    var os=Math.max(0,(peak-1)*100), settled = ts < TMAX-dt*2;
    $('zv').textContent=z.toFixed(2);
    $('os').textContent=os<.05?'none':os.toFixed(0)+' %';
    $('ts').textContent=settled?(ts+dt).toFixed(1)+' s':'over '+TMAX+' s';
    var k = z<.98?'under':z<=1.02?'crit':'over';
    var v=$('verdict'); v.dataset.k=k; v.textContent = k==='under'?'Underdamped: fast, but rings':k==='crit'?'Critically damped':'Overdamped: slow, no overshoot';
    $('zeta').setAttribute('aria-valuetext','damping ratio '+z.toFixed(2)+', '+v.textContent);
    if(firstDraw){ firstDraw=false; $('curve').classList.add('draw'); }
    else $('curve').classList.remove('draw');
  }
  $('zeta').addEventListener('input',hero);
  hero();

  var first = LABS[0];
  if(first){ $('scope-link').href=first.file; $('scope-link').textContent='Open the full '+first.title; }
})();
