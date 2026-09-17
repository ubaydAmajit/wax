/* Strip Wax Boutique — progressive enhancement only.
   Every page works with JavaScript disabled. */
(function () {
  'use strict';

  /* ---- Mobile navigation ------------------------------------------------ */
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

    // Reset state when the layout returns to desktop width.
    var mq = window.matchMedia('(min-width: 901px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  }

  /* ---- Price menu filters ----------------------------------------------- */
  var filters = document.querySelector('[data-menu-filters]');

  if (filters) {
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-category]'));
    var empty = document.querySelector('[data-menu-empty]');

    filters.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;

      var value = chip.dataset.filter;
      var shown = 0;

      filters.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });

      groups.forEach(function (group) {
        var match = value === 'all' || group.dataset.category === value;
        group.hidden = !match;
        if (match) shown++;
      });

      if (empty) empty.hidden = shown > 0;
    });
  }

  /* ---- Reveal on scroll -------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (revealables.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Current year in the footer --------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
