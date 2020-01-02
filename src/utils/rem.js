// var designWidth = 375
// var rem2px = 100
// document.documentElement.style.fontSize = ((window.innerWidth / designWidth) * rem2px) + 'px'

function setrem(e, t) {
  function n() {
    t.body ? t.body.style.fontSize = `${12 * o}px` : t.addEventListener('DOMContentLoaded', n);
  }

  function d() {
    const e = i.clientWidth / 10;
    i.style.fontSize = `${e}px`;
  }
  var i = t.documentElement;
  var o = e.devicePixelRatio || 1;
  // eslint-disable-next-line
  if (n(), d(), e.addEventListener('resize', d), e.addEventListener('pageshow', function (e) {
    e.persisted && d();
  }), o >= 2){
    const a = t.createElement('body');
    const s = t.createElement('div');
    s.style.border = '.5px solid transparent';
    a.appendChild(s);
    i.appendChild(a);
    s.offsetHeight === 1 && i.classList.add('hairlines');
    i.removeChild(a);
  }
}

setrem(window, document);
