/* Compatibility loader for pages that still reference assets/js/main.js. */
(function () {
  var currentScript = document.currentScript;
  var base = new URL("../../", currentScript.src);
  var app = document.createElement("script");
  app.src = new URL("main.js", base).href;
  app.onload = function () {
    var enhancements = document.createElement("script");
    enhancements.src = new URL("enhancements.js", base).href;
    document.head.appendChild(enhancements);
  };
  document.head.appendChild(app);
})();
