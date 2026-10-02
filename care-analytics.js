(function () {
  "use strict";

  var DISCOVERY_ENDPOINT = "https://realtyflow.chatgenius.pro/api/public/search-discovery";
  var CONVERSION_ENDPOINT = "https://realtyflow.chatgenius.pro/api/public/conversion-event";
  var SEARCH_HOSTS = [
    [/^gemini\.google\.com$/i, "google_gemini"],
    [/(^|\.)bing\.com$/i, "bing_search"],
    [/(^|\.)chatgpt\.com$/i, "chatgpt"],
    [/^copilot\.microsoft\.com$/i, "microsoft_copilot"],
    [/(^|\.)perplexity\.ai$/i, "perplexity"],
    [/(^|\.)google\.(?:com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/i, "google_search"],
    [/^search\.brave\.com$/i, "brave_search"],
    [/(^|\.)duckduckgo\.com$/i, "duckduckgo"]
  ];
  var SERVICE_TARGETS = {
    "/boligtilsyn-costa-blanca/": "care_service_boligtilsyn",
    "/nokkeloppbevaring-spania/": "care_service_nokkeloppbevaring",
    "/klargjoring-feriebolig/": "care_service_klargjoring",
    "/tilsyn-etter-uvaer/": "care_service_uvaer"
  };

  function safePath() {
    var path = window.location.pathname || "/";
    if (!path.startsWith("/") || path.length > 220 || /[@\x00-\x1f]/.test(path)) return "/";
    return path;
  }

  function safeDiscoveryReferrer(input) {
    if (!input || input.length > 4096) return null;
    try {
      var url = new URL(input);
      if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
      var host = url.hostname.toLowerCase();
      for (var i = 0; i < SEARCH_HOSTS.length; i += 1) {
        if (SEARCH_HOSTS[i][0].test(host)) {
          return { source: SEARCH_HOSTS[i][1], url: "https://" + host + "/" };
        }
      }
    } catch (_) {}
    return null;
  }

  function storageGet(key) {
    try { return window.sessionStorage.getItem(key); } catch (_) { return null; }
  }
  function storageSet(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch (_) {}
  }

  var path = safePath();
  var referrer = safeDiscoveryReferrer(document.referrer);
  if (referrer) {
    var discoveryKey = "care:search-discovery:" + path + ":" + referrer.source;
    if (!storageGet(discoveryKey)) {
      fetch(DISCOVERY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: path, referrer: referrer.url }),
        keepalive: true
      }).then(function (response) {
        if (response.status === 204) {
          storageSet(discoveryKey, "1");
          storageSet("care:discovery-source", referrer.source);
          storageSet("care:discovery-landing", path);
        }
      }).catch(function () {});
    }
  }

  function sendConversion(eventType, target) {
    var dedupeKey = "care:conversion:" + path + ":" + target;
    if (storageGet(dedupeKey)) return;

    fetch(CONVERSION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: eventType,
        target: target,
        path: path,
        discoverySource: storageGet("care:discovery-source"),
        landingPath: storageGet("care:discovery-landing")
      }),
      keepalive: true
    }).then(function (response) {
      if (response.status === 204) storageSet(dedupeKey, "1");
    }).catch(function () {});
  }

  window.careTrackConversion = sendConversion;

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    try {
      var url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      var target = null;
      if (url.hash === "#tilbud") target = "care_quote";
      else if (url.hash === "#priser") target = "care_pricing";
      else target = SERVICE_TARGETS[url.pathname] || null;
      if (target) sendConversion("next_step", target);
    } catch (_) {}
  });
})();