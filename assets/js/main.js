/* 4EBPTC 2027 — site behaviour */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  // Contact form: front-end only. Connect to a mail handler or form service before launch.
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var msg = form.querySelector('.form-msg');
      msg.textContent = 'The form is not yet connected to the conference mailbox. Please e-mail info@4ebptc.org.tr directly.';
      msg.style.display = 'block';
    });
  }

  // Banner slideshow (home page)
  var slides = document.querySelectorAll('.banner .slide');
  if (slides.length > 1) {
    var banner = document.querySelector('.banner');
    var creditEl = document.getElementById('slide-credit');
    var dots = document.createElement('div'); dots.className = 'dots';
    var current = 0, timer;
    var show = function (n) {
      slides[current].classList.remove('is-active');
      dots.children[current].classList.remove('is-active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots.children[current].classList.add('is-active');
      if (creditEl) {
        creditEl.textContent = slides[current].getAttribute('data-credit');
        creditEl.href = slides[current].getAttribute('data-url');
      }
    };
    var restart = function () { clearInterval(timer); timer = setInterval(function () { show(current + 1); }, 7000); };
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', 'Photo ' + (i + 1));
      if (i === 0) b.classList.add('is-active');
      b.addEventListener('click', function () { show(i); restart(); });
      dots.appendChild(b);
    });
    banner.appendChild(dots);
    restart();
  }

  // Intro overlay (home page, once per browser session)
  var intro = document.getElementById('intro');
  if (intro && !intro.hidden) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // split slogan lines into letters
    intro.querySelectorAll('[data-split]').forEach(function (p) {
      var text = p.textContent; p.textContent = '';
      Array.prototype.forEach.call(text, function (ch, i) {
        var s = document.createElement('span');
        s.textContent = ch;
        s.style.transitionDelay = (i * 45) + 'ms';
        p.appendChild(s);
      });
    });
    var l1 = intro.querySelectorAll('.intro-l1 span');
    var l2 = intro.querySelectorAll('.intro-l2 span');
    l1.forEach(function (s, i) { s.style.transitionDelay = (500 + i * 55) + 'ms'; });
    l2.forEach(function (s, i) { s.style.transitionDelay = (500 + l1.length * 55 + 250 + i * 55) + 'ms'; });

    // floating letters and words
    if (!reduce) {
      var pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        .concat(['poem', 'story', 'verse', 'page', 'read', 'write', 'hope', 'voice', 'book', 'word', 'şiir', 'kitap', 'söz']);
      var wrap = intro.querySelector('.intro-particles');
      var frag = document.createDocumentFragment();
      for (var k = 0; k < 46; k++) {
        var p = document.createElement('span');
        p.textContent = pool[Math.floor(Math.random() * pool.length)];
        var size = 0.7 + Math.random() * 1.6;
        p.style.left = (Math.random() * 100) + '%';
        p.style.fontSize = size + 'rem';
        p.style.setProperty('--dur', (6 + Math.random() * 6) + 's');
        p.style.setProperty('--delay', (-Math.random() * 10) + 's');
        p.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
        p.style.setProperty('--rot', (Math.random() * 60 - 30) + 'deg');
        p.style.setProperty('--op', (0.12 + Math.random() * 0.35).toFixed(2));
        p.style.setProperty('--blur', (size < 1 ? 1.5 : 0) + 'px');
        frag.appendChild(p);
      }
      wrap.appendChild(frag);
    }

    var done = false;
    var finish = function () {
      if (done) return; done = true;
      try { sessionStorage.setItem('4ebptc-intro', '1'); } catch (e) {}
      // scatter letters, then fade the overlay
      intro.querySelectorAll('.intro-line span').forEach(function (s) {
        s.style.transitionDelay = Math.round(Math.random() * 250) + 'ms';
        s.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
        s.style.setProperty('--dy', (-40 - Math.random() * 120) + 'px');
        s.style.setProperty('--r', (Math.random() * 40 - 20) + 'deg');
      });
      intro.classList.remove('in');
      intro.classList.add('out');
      setTimeout(function () {
        document.documentElement.classList.remove('intro-on');
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, reduce ? 250 : 1200);
    };

    requestAnimationFrame(function () { requestAnimationFrame(function () { intro.classList.add('in'); }); });
    setTimeout(finish, reduce ? 1500 : 4300);
    document.getElementById('intro-skip').addEventListener('click', finish);
    intro.addEventListener('click', function (e) { if (e.target === intro) finish(); });
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
