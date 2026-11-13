/*
 * 01 Hero — banner + optional below-hero
 * Requires: jQuery 3.4.1, Bootstrap 4.4.1 (loaded by the page shell).
 *
 * Responsibilities:
 *  - Pause the banner background video while #VideoModal is open and resume on close
 *    (replaces the inline handlers in reference-pages/banner-image-popup-video.html).
 *  - Any below-hero behaviour (video modal trigger / link) that the existing
 *    .video-popup + #VideoModal pattern in scripts.js doesn't already cover.
 */
(function ($) {
  'use strict';

  function init(el) {
    var $hero = $(el);
    // TODO: implement
  }

  $(function () {
    $('.cmu-hero').each(function () { init(this); });
  });
})(jQuery);
