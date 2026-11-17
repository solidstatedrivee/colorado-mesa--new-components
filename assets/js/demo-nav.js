/* ==== Demo nav ====
   DEMO ONLY - not part of the Cascade implementation.
   Floating hamburger menu that links every prototype page, so reviewers can jump
   between variations. Builds its own markup; works at any folder depth because
   paths are resolved from this script's own URL (assets/js/ -> repo root).
   Styles: assets/css/demo-nav.css (loaded by this script).
   To add a page, add it to PAGES below (paths are relative to the repo root). */
(function () {
    'use strict';

    var PAGES = [
        { group: 'Overview', items: [
            ['index.html', 'Component index'],
            ['components/full-page.html', 'Full page (mockup order)']
        ] },
        { group: '01 Hero', items: [
            ['components/01-hero/image--none.html', 'Image / no below-hero'],
            ['components/01-hero/image--video-modal.html', 'Image / video modal'],
            ['components/01-hero/image--link.html', 'Image / link'],
            ['components/01-hero/image-popup-video--none.html', 'Image + popup video / no below-hero'],
            ['components/01-hero/image-popup-video--video-modal.html', 'Image + popup video / video modal'],
            ['components/01-hero/image-popup-video--link.html', 'Image + popup video / link'],
            ['components/01-hero/video-background--none.html', 'Video background / no below-hero'],
            ['components/01-hero/video-background--video-modal.html', 'Video background / video modal'],
            ['components/01-hero/video-background--link.html', 'Video background / link']
        ] },
        { group: 'Other components', items: [
            ['components/02-icon-cards/all-variations.html', '02 Icon Cards'],
            ['components/03-modal-cards/all-variations.html', '03 Modal Cards'],
            ['components/04-two-column/all-variations.html', '04 Two Column'],
            ['components/05-image-grid/all-variations.html', '05 Image Grid']
        ] }
    ];

    var script = document.currentScript;
    if (!script) { return; }
    var root = new URL('../../', script.src);
    var here = location.href.split('#')[0].split('?')[0];

    function el(tag, attrs, text) {
        var node = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
        if (text) { node.textContent = text; }
        return node;
    }

    // Load the demo-only stylesheet so pages need just the one <script> tag.
    var css = el('link', { 'rel': 'stylesheet', 'href': new URL('assets/css/demo-nav.css', root).href });
    document.head.appendChild(css);

    function init() {
        var nav = el('nav', { 'class': 'cmu-demo-nav', 'aria-label': 'Demo pages' });
        var toggle = el('button', {
            'type': 'button',
            'class': 'cmu-demo-nav__toggle',
            'aria-expanded': 'false',
            'aria-controls': 'cmu-demo-nav-panel'
        });
        toggle.innerHTML = '<span class="cmu-demo-nav__bars" aria-hidden="true"></span>' +
            '<span class="sr-only">Demo pages menu</span>';

        var panel = el('div', { 'class': 'cmu-demo-nav__panel', 'id': 'cmu-demo-nav-panel', 'hidden': '' });
        panel.appendChild(el('p', { 'class': 'cmu-demo-nav__note' }, 'Demo navigation (not part of the build)'));

        PAGES.forEach(function (section) {
            panel.appendChild(el('p', { 'class': 'cmu-demo-nav__group' }, section.group));
            var list = el('ul', { 'class': 'cmu-demo-nav__list' });
            section.items.forEach(function (item) {
                var href = new URL(item[0], root).href;
                var link = el('a', { 'href': href, 'class': 'cmu-demo-nav__link' }, item[1]);
                if (href === here) { link.setAttribute('aria-current', 'page'); }
                var li = el('li');
                li.appendChild(link);
                list.appendChild(li);
            });
            panel.appendChild(list);
        });

        nav.appendChild(panel);
        nav.appendChild(toggle);
        document.body.appendChild(nav);

        function setOpen(open, returnFocus) {
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            nav.classList.toggle('is-open', open);
            if (open) {
                panel.removeAttribute('hidden');
                var current = panel.querySelector('[aria-current]') || panel.querySelector('a');
                if (current) { current.focus(); }
            } else {
                panel.setAttribute('hidden', '');
                if (returnFocus) { toggle.focus(); }
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true', false);
        });
        document.addEventListener('keydown', function (e) {
            if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('is-open')) {
                setOpen(false, true);
            }
        });
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
                setOpen(false, false);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
