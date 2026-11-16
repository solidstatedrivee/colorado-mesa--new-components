(function ($) {
  'use strict';

  function youtubeEmbed(id) {
    return 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
  }

  function init(el, gridIndex) {
    var $grid = $(el);
    var $thumbs = $grid.find('.cmu-image-grid__thumb');
    if (!$thumbs.length) {
      return;
    }

    var total = $thumbs.length;
    var showCount = !$grid.hasClass('cmu-image-grid--no-count');
    var showCaptions = !$grid.hasClass('cmu-image-grid--no-captions');
    var heading = $.trim($grid.find('h2').first().text()).replace(/[.!?:;,]+$/, '');
    var $trigger = $();

    var $viewer = $(
      '<div class="modal fade cmu-image-grid__viewer" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
          '<div class="modal-content">' +
            '<button type="button" class="cmu-image-grid__close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<div class="carousel slide">' +
              '<div class="carousel-inner"></div>' +
              '<button type="button" class="carousel-control-prev cmu-image-grid__nav"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></button>' +
              '<button type="button" class="carousel-control-next cmu-image-grid__nav"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></button>' +
            '</div>' +
            '<p class="cmu-image-grid__status" aria-live="polite"><span class="cmu-image-grid__count"></span> <span class="cmu-image-grid__caption"></span></p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    var viewerId = 'cmu-image-grid-viewer-' + (gridIndex + 1);
    $viewer.attr({
      id: viewerId,
      'aria-label': heading ? heading + ' gallery' : 'Gallery',
      'aria-describedby': viewerId + '-status'
    });
    $viewer.find('.cmu-image-grid__status').attr('id', viewerId + '-status');
    // Visually hidden only: screen readers still hear which item is showing
    $viewer.find('.cmu-image-grid__count').toggleClass('sr-only', !showCount);
    $viewer.find('.cmu-image-grid__caption').toggleClass('sr-only', !showCaptions);
    $viewer.find('.cmu-image-grid__status').toggleClass('cmu-image-grid__status--hidden', !showCount && !showCaptions);

    var $carousel = $viewer.find('.carousel');
    var $inner = $viewer.find('.carousel-inner');

    $thumbs.each(function (i) {
      var $thumb = $(this);
      if (!$.trim($thumb.find('img').attr('alt') || '') && !$thumb.attr('aria-label')) {
        $thumb.attr('aria-label', 'Photo ' + (i + 1) + ' of ' + total);
      }
      $('<div class="carousel-item"><div class="cmu-image-grid__slide"></div></div>')
        .data({
          src: $thumb.attr('href'),
          youtube: $thumb.data('youtube'),
          poster: $thumb.find('img').attr('src'),
          alt: $thumb.find('img').attr('alt') || ''
        })
        .appendTo($inner);
    });

    var $items = $inner.children();

    function item(i) {
      return $items.eq((i + total) % total);
    }

    function loadImage(i) {
      var $item = item(i);
      if ($item.data('youtube') || $item.data('loaded')) {
        return;
      }
      $('<img class="cmu-image-grid__full">').attr({ src: $item.data('src'), alt: $item.data('alt') })
        .appendTo($item.find('.cmu-image-grid__slide'));
      $item.data('loaded', true);
    }

    function startVideo(i) {
      var $item = item(i);
      if (!$item.data('youtube')) {
        return null;
      }
      var $frame = $('<iframe allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>')
        .attr({ src: youtubeEmbed($item.data('youtube')), title: $item.data('alt') || 'Video' });
      $item.find('.cmu-image-grid__slide').empty().append($('<div class="cmu-image-grid__video"></div>').append($frame));
      return $frame;
    }

    // Keyboard opens (e.detail === 0) focus the player so K / Space pause it
    function focusPlayer($frame) {
      $frame.addClass('cmu-image-grid__frame--focus').trigger('focus')
        .one('blur', function () { $(this).removeClass('cmu-image-grid__frame--focus'); });
    }

    // Arriving via prev/next shows a Play button instead of autoplaying (WCAG 1.4.2)
    function showPoster(i) {
      var $item = item(i);
      if (!$item.data('youtube') || $item.find('.cmu-image-grid__start').length) {
        return;
      }
      var $button = $('<button type="button" class="cmu-image-grid__start"><img alt=""><span class="cmu-image-grid__start-icon" aria-hidden="true"></span><span class="sr-only"></span></button>');
      $button.find('img').attr('src', $item.data('poster'));
      $button.find('.sr-only').text('Play video' + ($item.data('alt') ? ': ' + $item.data('alt') : ''));
      $button.on('click', function (e) {
        var $frame = startVideo(i);
        if ($frame && e.detail === 0) {
          focusPlayer($frame);
        } else {
          $viewer.trigger('focus');
        }
      });
      $item.find('.cmu-image-grid__slide').empty().append($('<div class="cmu-image-grid__video"></div>').append($button));
    }

    function stopVideo(i) {
      var $item = item(i);
      if ($item.data('youtube')) {
        $item.find('.cmu-image-grid__slide').empty();
      }
    }

    function prepare(i) {
      loadImage(i);
      loadImage(i - 1);
      loadImage(i + 1);
      $viewer.find('.cmu-image-grid__count').text(((i % total) + 1) + ' / ' + total);
      $viewer.find('.cmu-image-grid__caption').text(item(i).data('alt'));
    }

    $carousel.carousel({ interval: false, keyboard: false, wrap: true, touch: true });

    $carousel.on('slide.bs.carousel', function (e) {
      stopVideo(e.from);
      prepare(e.to);
      showPoster(e.to);
    });

    $viewer.find('.carousel-control-prev').on('click', function () { $carousel.carousel('prev'); });
    $viewer.find('.carousel-control-next').on('click', function () { $carousel.carousel('next'); });

    $viewer.on('keydown', function (e) {
      if (e.key === 'Tab') {
        var $focusable = $viewer.find('button, iframe').filter(':visible');
        var first = $focusable.get(0);
        var last = $focusable.get($focusable.length - 1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === $viewer[0])) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        $carousel.carousel('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        $carousel.carousel('next');
      }
    });

    $viewer.on('hidden.bs.modal', function () {
      $items.each(function (i) { stopVideo(i); });
      $trigger.trigger('focus');
    });

    $thumbs.on('click', function (e) {
      e.preventDefault();
      $trigger = $(this);
      var i = $thumbs.index(this);
      $items.removeClass('active').eq(i).addClass('active');
      prepare(i);
      var $frame = startVideo(i);
      if ($frame && e.detail === 0) {
        $viewer.one('shown.bs.modal', function () { focusPlayer($frame); });
      }
      $viewer.modal('show');
    });

    $viewer.appendTo(document.body);
  }

  $(function () {
    $('.cmu-image-grid').each(function (i) { init(this, i); });
  });
})(jQuery);
