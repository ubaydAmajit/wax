/* Strip Wax Boutique. Progressive enhancement only: every page works without it. */
(function () {
  'use strict';

  /* ---- Mobile menu ------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset when the layout returns to desktop width.
    var mq = window.matchMedia('(min-width: 821px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  }

  /* ---- Testimonial slider ----------------------------------------------
     The track is a scroll-snap row that already works on its own. This adds
     arrows, dots and a gentle autoplay on top. */
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('[data-slider-track]');
    var slides = Array.prototype.slice.call(track.children);
    var dotsBox = slider.querySelector('[data-slider-dots]');
    var prev = slider.querySelector('[data-slider-prev]');
    var next = slider.querySelector('[data-slider-next]');
    if (slides.length < 2) return;

    var index = 0;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    var dots = slides.map(function (slide, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Review ' + (i + 1) + ' of ' + slides.length);
      dot.addEventListener('click', function () { stop(); go(i); });
      dotsBox.appendChild(dot);
      return dot;
    });

    var paint = function () {
      dots.forEach(function (dot, i) { dot.setAttribute('aria-current', String(i === index)); });
    };

    var go = function (i) {
      index = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: calm.matches ? 'auto' : 'smooth' });
      paint();
    };

    // Keep the dots honest if someone swipes the track directly.
    var settle;
    track.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var mid = track.scrollLeft + track.clientWidth / 2;
        slides.forEach(function (slide, i) {
          if (mid >= slide.offsetLeft - track.offsetLeft && mid < slide.offsetLeft - track.offsetLeft + slide.offsetWidth) index = i;
        });
        paint();
      }, 90);
    });

    prev.addEventListener('click', function () { stop(); go(index - 1); });
    next.addEventListener('click', function () { stop(); go(index + 1); });

    var timer = null;
    var start = function () {
      if (timer || calm.matches) return;
      timer = setInterval(function () { go(index + 1); }, 6000);
    };
    var stop = function () { clearInterval(timer); timer = null; };

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });

    slider.classList.add('is-enhanced');
    paint();
    start();
  });

  /* ---- Contact form ----------------------------------------------------
     No backend, so the form hands the message to the visitor's email app.
     Without JavaScript the mailto action on the form does the same job. */
  var form = document.querySelector('[data-mailto]');

  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.reportValidity()) return;
      e.preventDefault();

      var get = function (name) {
        var el = form.elements[name];
        return el ? el.value.trim() : '';
      };

      var body = 'Name: ' + get('name') + '\nEmail: ' + get('email') + '\n\n' + get('message');
      window.location.assign('mailto:' + form.dataset.mailto +
        '?subject=' + encodeURIComponent('Website enquiry: ' + get('subject')) +
        '&body=' + encodeURIComponent(body));
    });
  }

  /* ---- Footer year ------------------------------------------------------ */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
