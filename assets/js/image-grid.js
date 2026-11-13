/*
 * 05 Image Grid — full-screen click-through viewer
 * Requires: jQuery 3.4.1, Bootstrap 4.4.1 (loaded by the page shell). No other dependencies.
 *
 * Approach: Bootstrap 4 modal + carousel.
 *  - Open the viewer at the clicked item's index.
 *  - Prev/next buttons, keyboard arrows, Esc to close, swipe on touch.
 *  - YouTube items: create the iframe when its slide becomes active; clear its src on
 *    slide-away and on modal close so audio stops.
 *  - Support multiple grids per page (unique modal/carousel IDs per instance).
 *  - Return focus to the clicked thumbnail on close.
 */
(function ($) {
  'use strict';

  function init(el, gridIndex) {
    var $grid = $(el);
    // TODO: implement
  }

  $(function () {
    $('.cmu-image-grid').each(function (i) { init(this, i); });
  });
})(jQuery);
