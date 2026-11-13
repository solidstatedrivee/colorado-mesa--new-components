/*
 * 03 Modal Cards
 * Requires: jQuery 3.4.1, Bootstrap 4.4.1 (loaded by the page shell).
 *
 * Responsibilities:
 *  - Video cards: reuse the page's single #VideoModal (data-src / data-target / data-toggle).
 *  - Content / custom-block cards: open their own modal. IDs must be unique per row + card
 *    (e.g. modal-r2-c3) so multiple Modal Cards rows can live on one page.
 *  - Return focus to the triggering card on close.
 */
(function ($) {
  'use strict';

  function init(el, rowIndex) {
    var $row = $(el);
    // TODO: implement
  }

  $(function () {
    $('.cmu-modal-cards').each(function (i) { init(this, i); });
  });
})(jQuery);
