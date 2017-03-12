/* global ga */

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = 1*new Date();
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a,m);
})(window, document, 'script','//www.google-analytics.com/analytics.js', 'ga');   // 即時関数を使用している。

ga('create', 'UA-29141274-4', 'auto');   // reloadするタイミングで使ってる。
ga('send', 'pageview');