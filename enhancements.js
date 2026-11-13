/* Portfolio content and image-path enhancements for GitHub Pages. */
(function () {
  'use strict';

  // Image files are stored at the repository root; some pages still use the former assets/images path.
  document.querySelectorAll('img[src^="assets/images/"]').forEach(function (image) {
    image.src = image.getAttribute('src').split('/').pop();
  });

  var page = document.body.getAttribute('data-page');

  if (page === 'about') {
    var intro = document.querySelector('.split-grid .page-intro');
    if (intro) {
      intro.textContent = 'I’m an A-Level student in Karachi with a strong interest in artificial intelligence. I’m also curious about cybersecurity, SEO, and software development. My studies in Computer Science, Mathematics, and Physics give me a foundation for exploring how technology works and how it can be used to solve problems.';
    }
    var tags = document.querySelector('.tag-row');
    if (tags) {
      tags.innerHTML = '<span class="tag">Artificial intelligence · main interest</span><span class="tag">Cybersecurity</span><span class="tag">SEO</span><span class="tag">Software development</span><span class="tag">Computer Science</span>';
    }
    var aboutCopy = document.querySelector('.module-card p:last-child');
    if (aboutCopy) {
      aboutCopy.textContent = 'Artificial intelligence is my main area of interest. I also want to learn more about cybersecurity, SEO, and software development. My SEO internship and volunteering experience have helped me build practical skills, patience, and confidence working with others.';
    }
  }

  if (page === 'aspirations') {
    document.title = 'Interests & Aspirations · The Idea Engine — Umaizah Azam';
    var kicker = document.querySelector('.screen-kicker');
    var title = document.querySelector('.page-title');
    var intro = document.querySelector('.page-intro');
    if (kicker) kicker.textContent = 'Blueprint station · interests and future goals';
    if (title) title.innerHTML = 'What I’m curious about<br>and where I want to <span class="accent">go.</span>';
    if (intro) intro.textContent = 'Artificial intelligence is my main interest. I’m also exploring cybersecurity, SEO, and software development as I continue learning.';

    var keys = ['ai', 'cybersecurity', 'seo', 'software'];
    var labels = ['Artificial intelligence', 'Cybersecurity', 'SEO', 'Software development'];
    var descriptions = [
      'AI is my main interest. I want to learn how intelligent systems are designed and how they can solve useful, real-world problems.',
      'I’m interested in cybersecurity and learning how to protect systems, data, and people online.',
      'I want to understand how search engines evaluate websites and how SEO can help people find useful information.',
      'I enjoy learning how websites and software are built, and I want to develop the skills to create useful digital products.'
    ];
    var tabs = document.querySelectorAll('.blueprint-tab');
    tabs.forEach(function (button, index) {
      button.setAttribute('data-key', keys[index]);
      button.setAttribute('data-status', labels[index] + ' interest selected.');
      button.setAttribute('aria-pressed', String(index === 0));
      button.querySelector('strong').textContent = labels[index];
      var span = button.querySelector('span');
      if (span) span.textContent = 'INTEREST / 0' + (index + 1);
    });
    var panels = document.querySelectorAll('.blueprint-sheet > div[id^="blueprint-"]');
    panels.forEach(function (panel, index) {
      panel.id = 'blueprint-' + keys[index];
      panel.hidden = index !== 0;
      panel.innerHTML = '<span class="module-code">Interest / 0' + (index + 1) + '</span><h2>' + labels[index] + '</h2><p>' + descriptions[index] + '</p>';
    });
    var status = document.getElementById('aspirations-status');
    if (status) status.textContent = 'Artificial intelligence is my main interest.';

    var aspiration = document.createElement('section');
    aspiration.className = 'module-card';
    aspiration.style.marginTop = '24px';
    aspiration.innerHTML = '<span class="module-code">Future aspiration / artificial intelligence</span><h2>My goal: a career in AI</h2><p>I hope to earn a university degree in Artificial Intelligence and build a career as an AI engineer or developer. In the future, I would like to contribute my skills to a respected multinational company, while continuing to learn and create technology that makes a positive difference.</p>';
    var layout = document.querySelector('.blueprint-layout');
    if (layout) layout.insertAdjacentElement('afterend', aspiration);

    var action = document.querySelector('.c-blueprint .component-action');
    var aria = document.querySelector('.c-blueprint');
    if (action) action.textContent = 'Interests & aspirations';
    if (aria) aria.setAttribute('aria-label', 'Operate Blueprint station — Interests and aspirations');
  }
})();
