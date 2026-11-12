/* THE IDEA ENGINE — static, no tracking, no external runtime dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  var body = document.body;
  var storage = {
    get: function (key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } },
    set: function (key, value) { try { window.localStorage.setItem(key, value); } catch (e) {} }
  };
  var session = {
    get: function (key) { try { return window.sessionStorage.getItem(key); } catch (e) { return null; } },
    set: function (key, value) { try { window.sessionStorage.setItem(key, value); } catch (e) {} },
    remove: function (key) { try { window.sessionStorage.removeItem(key); } catch (e) {} }
  };
  var media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var storedMotion = storage.get('idea-engine-motion');
  var motionOn = storedMotion ? storedMotion === 'on' : !media.matches;
  var timers = [];
  function later(fn, ms) { var id = window.setTimeout(fn, ms); timers.push(id); return id; }
  function clearTimers() { timers.forEach(window.clearTimeout); timers = []; }
  function applyMotion() {
    root.setAttribute('data-motion', motionOn ? 'on' : 'off');
    var toggle = document.getElementById('motion-toggle');
    var label = document.getElementById('motion-label');
    if (toggle) toggle.setAttribute('aria-pressed', String(motionOn));
    if (label) label.textContent = motionOn ? 'Motion: on' : 'Motion: off';
  }
  applyMotion();
  var motionToggle = document.getElementById('motion-toggle');
  if (motionToggle) motionToggle.addEventListener('click', function () {
    motionOn = !motionOn;
    storage.set('idea-engine-motion', motionOn ? 'on' : 'off');
    applyMotion();
  });

  /* Homework 7 connection. Empty config intentionally routes to an honest setup page. */
  var config = window.IDEA_ENGINE_CONFIG || {};
  var hwUrl = typeof config.homework7Url === 'string' ? config.homework7Url.trim() : '';
  var hwValid = /^https?:\/\//i.test(hwUrl);
  document.querySelectorAll('.homework-link').forEach(function (link) {
    if (hwValid) {
      link.href = hwUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  document.querySelectorAll('[data-hw-status]').forEach(function (el) {
    el.textContent = hwValid ? 'CONNECTED' : 'URL PENDING';
  });

  /* Smooth page-to-page transitions for internal HTML links only. */
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest ? event.target.closest('a[href]') : null;
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    var href = link.getAttribute('href') || '';
    if (!/\.html(?:[?#].*)?$/.test(href) || /^https?:/i.test(href) || href.indexOf('//') === 0) return;
    if (!motionOn) return;
    event.preventDefault();
    body.classList.add('is-leaving');
    later(function () { window.location.assign(link.href); }, 180);
  });

  /* One short power-on sequence per browser session, only on Home. */
  var boot = document.getElementById('boot-screen');
  var isHome = body.getAttribute('data-page') === 'home';
  if (boot && isHome && motionOn && !session.get('idea-engine-booted')) {
    var bootMessage = document.getElementById('boot-message');
    var skip = document.getElementById('skip-boot');
    var finished = false;
    boot.hidden = false;
    body.classList.add('booting');
    if (skip) skip.focus();
    function finishBoot() {
      if (finished) return;
      finished = true;
      boot.hidden = true;
      body.classList.remove('booting');
      session.set('idea-engine-booted', '1');
      var main = document.getElementById('main');
      if (main) main.focus({ preventScroll: true });
    }
    if (bootMessage) {
      later(function () { bootMessage.textContent = 'Calibrating identity scanner…'; }, 450);
      later(function () { bootMessage.textContent = 'Connecting creative systems…'; }, 900);
    }
    later(finishBoot, 1550);
    if (skip) skip.addEventListener('click', finishBoot);
  } else if (isHome) {
    session.set('idea-engine-booted', '1');
  }

  /* Home: run a three-stage idea cycle. */
  var runCycle = document.getElementById('run-cycle');
  if (runCycle) {
    var stage = document.querySelector('.engine-stage');
    var steps = Array.prototype.slice.call(document.querySelectorAll('[data-cycle]'));
    var cycleStatus = document.getElementById('cycle-status');
    function setCycle(index, message) {
      steps.forEach(function (step, i) { step.classList.toggle('active', i === index); });
      if (cycleStatus) cycleStatus.textContent = message;
    }
    runCycle.addEventListener('click', function () {
      runCycle.disabled = true;
      if (stage) stage.classList.add('running');
      setCycle(0, 'INPUT / Curiosity collected.');
      later(function () { setCycle(1, 'PROCESS / Logic and care applied.'); }, 650);
      later(function () { setCycle(2, 'OUTPUT / An idea made useful.'); }, 1300);
      later(function () {
        if (stage) stage.classList.remove('running');
        runCycle.disabled = false;
        if (cycleStatus) cycleStatus.textContent = 'Cycle complete. Operate another control to explore.';
      }, 2000);
    });
  }

  /* Skills processor: switch evidence banks without invented proficiency scores. */
  function wireSelector(buttonSelector, panelPrefix, statusId) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll(buttonSelector));
    if (!buttons.length) return;
    var status = document.getElementById(statusId);
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var key = button.getAttribute('data-key');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
        document.querySelectorAll('[id^="' + panelPrefix + '"]').forEach(function (panel) {
          panel.hidden = panel.id !== panelPrefix + key;
        });
        if (status) status.textContent = button.getAttribute('data-status') || '';
        if (key === 'scholarship') setNeedle(-45);
        if (key === 'service') setNeedle(-15);
        if (key === 'experience') setNeedle(15);
        if (key === 'learning') setNeedle(45);
      });
    });
  }
  function setNeedle(angle) {
    var needle = document.querySelector('.gauge-needle');
    if (needle) needle.style.setProperty('--needle-angle', angle + 'deg');
  }
  wireSelector('[data-bank]', 'bank-', 'processor-status');
  wireSelector('[data-channel]', 'channel-', 'achievement-status');
  wireSelector('[data-blueprint]', 'blueprint-', 'aspirations-status');

  /* Project inspection chambers. Native dialog provides Escape and focus handling. */
  document.querySelectorAll('[data-dialog]').forEach(function (button) {
    button.addEventListener('click', function () {
      var dialog = document.getElementById(button.getAttribute('data-dialog'));
      if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  document.querySelectorAll('dialog').forEach(function (dialog) {
    var close = dialog.querySelector('[data-close]');
    if (close) close.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  });

  /* Contact terminal: compose a mailto draft; never pretend to send or store a message. */
  var emailForm = document.getElementById('email-form');
  var contactStatus = document.getElementById('contact-status');
  if (emailForm) {
    emailForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!emailForm.reportValidity()) return;
      var name = document.getElementById('sender-name').value.trim();
      var subject = document.getElementById('sender-subject').value.trim() || 'A connection from The Idea Engine';
      var message = document.getElementById('sender-message').value.trim();
      var bodyText = 'Hello Umaizah,\n\n' + message + '\n\nFrom: ' + name;
      var mailto = 'mailto:2028010275@heusercollege.edu.pk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
      if (contactStatus) contactStatus.textContent = 'Your mail app should open with a draft.';
      window.location.href = mailto;
    });
  }
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy');
      function done(ok) {
        if (contactStatus) contactStatus.textContent = ok ? 'Email address copied to your clipboard.' : 'Copy was unavailable. Select the email address shown above instead.';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done(true); }, function () { fallbackCopy(value, done); });
      } else fallbackCopy(value, done);
    });
  });
  function fallbackCopy(value, done) {
    var area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(area);
    done(ok);
  }

  window.addEventListener('pagehide', clearTimers);
})();
