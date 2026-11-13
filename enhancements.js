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
      'Artificial intelligence is my main interest because it combines technology, creativity, and problem-solving. I want to learn how machine-learning systems understand patterns, make predictions, and support useful solutions in areas such as education, healthcare, and everyday life.',
      'I’m interested in cybersecurity because keeping people, information, and digital services safe is increasingly important. I want to learn how security risks arise, how systems can be protected, and how responsible security practices help create a safer online world.',
      'SEO interests me because it helps useful websites become easier to discover. I want to understand how search engines find and organize information, and how clear content, accessible design, and good technical structure can improve a website’s visibility.',
      'I’m interested in software development because it turns ideas into tools people can use. I want to strengthen my programming skills, learn how to plan and build reliable applications, and create projects that solve real problems.'
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
