(function ($) {
  'use strict';

  function stopMedia() {
    $(this).find('iframe').each(function () {
      var src = this.getAttribute('src');
      if (src) {
        this.setAttribute('src', src);
      }
    });
    $(this).find('video, audio').each(function () {
      this.pause();
    });
  }

  function init(el) {
    var $row = $(el);

    $row.find('.cmu-modal-cards__trigger[data-target^="#modal-"]').each(function () {
      var $modal = $($(this).attr('data-target'));
      // .cd-main-content (z-index + transform) traps modals under the backdrop; #VideoModal lives in <body> too
      if ($modal.length && $modal.parent()[0] !== document.body) {
        $modal.appendTo(document.body);
      }
      $modal.off('hidden.bs.modal.cmuModalCards').on('hidden.bs.modal.cmuModalCards', stopMedia);
    });

    $row.find('.cmu-modal-cards__trigger.video-popup').on('click', function () {
      var title = $(this).data('video-title');
      if (title) {
        $('#VideoModal').attr('aria-label', title);
        $('#video').attr('title', title);
      }
    });
  }

  $(function () {
    var $rows = $('.cmu-modal-cards');
    if (!$rows.length) {
      return;
    }

    $rows.each(function () { init(this); });

    var $videoModal = $('#VideoModal');
    var originalLabel = $videoModal.attr('aria-label');
    var originalTitle = $('#video').attr('title');
    $videoModal.on('hidden.bs.modal', function () {
      $videoModal.attr('aria-label', originalLabel);
      $('#video').attr('title', originalTitle);
    });
  });
})(jQuery);
