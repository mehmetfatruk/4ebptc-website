/* 4EBPTC 2027 — site behaviour */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle) setNav(false);
    });
  }

  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Shadow under the sticky menu bar and the back-to-top button
  var navbar = document.querySelector('.navbar');
  var toTop = document.querySelector('.to-top');
  if (toTop) toTop.hidden = false;
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (navbar) navbar.classList.toggle('is-stuck', navbar.getBoundingClientRect().top <= 0 && y > 0);
    if (toTop) toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
    var restart = function () {
      clearInterval(timer);
      if (!reduceMotion && !document.hidden) timer = setInterval(function () { show(current + 1); }, 7000);
    };
    document.addEventListener('visibilitychange', restart);
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
    var reduce = reduceMotion;
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

  // Countdown to the opening day (home banner)
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-countdown')).getTime();
    var parts = { d: cd.querySelector('[data-cd="d"]'), h: cd.querySelector('[data-cd="h"]'), m: cd.querySelector('[data-cd="m"]') };
    var tick = function () {
      var diff = target - Date.now();
      if (!(diff > 0)) { cd.hidden = true; return false; }
      parts.d.textContent = Math.floor(diff / 864e5);
      parts.h.textContent = Math.floor(diff / 36e5) % 24;
      parts.m.textContent = Math.floor(diff / 6e4) % 60;
      cd.hidden = false;
      return true;
    };
    if (tick()) setInterval(tick, 30000);
  }

  // Video: load the embedded player only when the visitor asks for it
  document.querySelectorAll('.video[data-video]').forEach(function (box) {
    var btn = box.querySelector('.video-play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-video');
      f.title = 'Conference video';
      f.allow = 'autoplay; fullscreen; picture-in-picture';
      f.allowFullscreen = true;
      box.replaceChild(f, btn);
    });
  });

  // Gentle reveal of content blocks as they scroll into view
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.series > *, .partner, .speaker, .cols > *, .video, .venue-block').forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('reveal'); io.observe(el); }
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
