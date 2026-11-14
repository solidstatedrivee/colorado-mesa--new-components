/*
 * 01 Hero — banner + optional below-hero
 * Requires: jQuery 3.4.1, Bootstrap 4.4.1 (loaded by the page shell).
 *
 * Currently NO custom JS is needed — existing site code covers all behaviour:
 *  - Video modal (banner "Watch Video" button + below-hero video panel):
 *    www.coloradomesa.edu/js/scripts.js handles any .video-popup[data-src] -> #VideoModal.
 *  - YouTube background banner: jquery.tubular pauses/plays via the .tubular-pause
 *    (trigger) / .tubular-play (#VideoModal close) classes.
 *  - Uploaded background video: the banner's own inline show/hidden.bs.modal script.
 *
 * Kept as a hook for future hero behaviour.
 */
(function ($) {
  'use strict';

  function init(el) {
    // Intentionally empty.
  }

  $(function () {
    $('.cmu-hero').each(function () { init(this); });
  });
})(jQuery);
