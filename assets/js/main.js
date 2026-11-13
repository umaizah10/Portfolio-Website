/* Compatibility loader for pages that still reference assets/js/main.js. */
(function () {
  var currentScript = document.currentScript;
  var mainScript = document.createElement("script");
  mainScript.src = new URL("../../main.js", currentScript.src).href;
  document.head.appendChild(mainScript);
})();
