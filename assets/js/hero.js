/*
 * 01 Hero — banner + optional below-hero
 * Requires: jQuery 3.4.1, Bootstrap 4.4.1 (loaded by the page shell).
 *
 * Existing site code covers the rest:
 *  - Video modal: www.coloradomesa.edu/js/scripts.js handles any .video-popup[data-src] -> #VideoModal.
 *  - YouTube background banner: jquery.tubular pauses/plays via .tubular-pause / .tubular-play.
 *  - Uploaded background video: the banner's own inline script pauses it while #VideoModal is open.
 *
 * This file adds the pause/play control for an uploaded background video (#banner-upload-video).
 */
(function ($) {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // WCAG 2.2.2: a looping background video needs a way to pause it
  function initBackgroundVideo($hero) {
    var video = $hero.find('#banner-upload-video')[0];
    if (!video) {
      return;
    }
    var userPaused = reduceMotion;
    var $button = $('<button type="button" class="cmu-hero__video-toggle"><span class="cmu-hero__video-toggle-icon" aria-hidden="true"></span><span class="sr-only"></span></button>');

    function render() {
      $button.toggleClass('is-paused', video.paused)
        .find('.sr-only').text(video.paused ? 'Play background video' : 'Pause background video');
    }

    if (reduceMotion) {
      video.pause();
    }

    $button.on('click', function () {
      userPaused = !video.paused;
      if (userPaused) {
        video.pause();
      } else {
        video.play();
      }
    });
    $(video).on('play pause', render);

    // The banner's script resumes the video when #VideoModal closes; keep it paused if the visitor paused it
    $(document).on('hidden.bs.modal', '#VideoModal', function () {
      if (userPaused) {
        $(video).one('playing', function () { video.pause(); });
      }
    });

    $hero.find('section.banner').first().append($button);
    render();
  }

  $(function () {
    $('.cmu-hero').each(function () { initBackgroundVideo($(this)); });
  });
})(jQuery);
