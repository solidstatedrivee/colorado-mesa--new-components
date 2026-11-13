function carouselNormalization() {
  function t() {
    (jQuery("#internalCarousel .carousel-inner .carousel-item").each(
      function () {
        window.heights.push(jQuery(this).outerHeight());
      },
    ),
      (window.tallest = Math.max.apply(null, window.heights)),
      jQuery("#internalCarousel .carousel-inner .carousel-item").each(
        function () {
          jQuery(this).css("min-height", tallest + "px");
        },
      ));
  }
  ((window.heights = []),
    window.tallest,
    t(),
    jQuery(window).on("resize orientationchange", function () {
      ((window.tallest = 0),
        (window.heights.length = 0),
        jQuery(".carousel-inner .carousel-item").each(function () {
          jQuery(this).css("min-height", "0");
        }),
        t());
    }));
}
($(document).ready(function () {
  $('a.scrolly[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (t) {
      var a;
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname &&
        (a = (a = $(this.hash)).length
          ? a
          : $("[name=" + this.hash.slice(1) + "]")).length &&
        (t.preventDefault(),
        $("html, body").animate(
          { scrollTop: a.offset().top },
          1e3,
          function () {
            var t = $(a);
            if ((t.focus(), t.is(":focus"))) return !1;
            (t.attr("tabindex", "-1"), t.focus());
          },
        ));
    });
}),
  jQuery(document).ready(function () {
    (jQuery(window).scroll(function () {
      900 < jQuery(this).scrollTop()
        ? jQuery("#back-to-top").fadeIn(300)
        : jQuery("#back-to-top").fadeOut(300);
    }),
      jQuery("#back-to-top").click(function (t) {
        return (
          t.preventDefault(),
          jQuery("html, body").animate({ scrollTop: 0 }, 300),
          !1
        );
      }));
  }),
  $(window).on("load", function () {
    var t;
    ($(".video-popup").click(function () {
      t = $(this).data("src");
    }),
      $("#VideoModal").on("shown.bs.modal", function () {
        $("#video").attr(
          "src",
          t + "?autoplay=1&rel=0&modestbranding=1&showinfo=0",
        );
      }),
      $("#VideoModal").on("hide.bs.modal", function () {
        $("#video").attr("src", t);
      }));
  }),
  jQuery(document).ready(function () {
    carouselNormalization();
  }),
  
  
//   $(document).ready(function () {
//     $(".link-box").click(function () {
//       return ((window.location = $(this).find("a").attr("href")), !1);
//     });
//   }),


$(document).ready(function() {
    $(".link-box").click(function(event) {

        // Let actual links handle their own navigation.
        if ($(event.target).closest("a").length) {
            return;
        }

        // Make the remaining card area clickable.
        var link = $(this).find("a").first();

        if (!link.length) {
            return;
        }

        var href = link.attr("href");
        var target = link.attr("target");

        if (!href) {
            return;
        }

        if (target === "_blank") {
            window.open(href, "_blank", "noopener");
        } else {
            window.location.href = href;
        }
    });
}),


  $(function () {
    ($(".carousel .playButton").click(function () {
      $(".carousel").carousel("cycle");
    }),
      $(".carousel .pauseButton").click(function () {
        $(".carousel").carousel("pause");
      }));
  }),
  (function (s) {
    "use strict";
    function n(t, a) {
      ((this.options = a),
        (this.$tabs = s(t)),
        (this._accordionVisible = !1),
        this._initAccordion(),
        this._checkStateOnResize());
      var e = this;
      setTimeout(function () {
        e.checkState();
      }, 0);
    }
    ((n.DEFAULTS = {
      accordionClass: "d-md-none",
      tabsClass: "d-none d-md-block",
      accordionTemplate: function (t, a, e, o) {
        return (
          '<div class="panel panel-default">   <div class="panel-heading">      <div class="panel-title h4">      </div>   </div>   <div id="' +
          a +
          '" class="panel-collapse collapse ' +
          (o ? "show" : "") +
          '">       <div class="panel-body js-tabcollapse-panel-body">       </div>   </div></div>'
        );
      },
    }),
      (n.prototype.checkState = function () {
        this.$tabs.is(":visible") && this._accordionVisible
          ? (this.showTabs(), (this._accordionVisible = !1))
          : this.$accordion.is(":visible") &&
            !this._accordionVisible &&
            (this.showAccordion(), (this._accordionVisible = !0));
      }),
      (n.prototype.showTabs = function () {
        var o = this;
        (this.$tabs.trigger(s.Event("show-tabs.bs.tabcollapse")),
          this.$accordion
            .find(".js-tabcollapse-panel-heading")
            .detach()
            .each(function () {
              var t = s(this),
                a = t.data("bs.tabcollapse.parentLi"),
                e = o._panelHeadingToTabHeading(t);
              (a.removeClass("active"),
                a.parent().hasClass("dropdown-menu") &&
                  !a.siblings("li").hasClass("active") &&
                  a.parent().parent().removeClass("active"),
                e.hasClass("collapsed")
                  ? e.removeClass("collapsed")
                  : (a.addClass("active"),
                    a.parent().hasClass("dropdown-menu") &&
                      a.parent().parent().addClass("active")),
                a.append(t));
            }),
          s("li").hasClass("active") || s("li").first().addClass("active"),
          this.$accordion.find(".js-tabcollapse-panel-body").each(function () {
            var t = s(this);
            t.data("bs.tabcollapse.tabpane").append(t.contents().detach());
          }),
          this.$accordion.html(""),
          this.options.updateLinks &&
            this.getTabContentElement()
              .find('[data-toggle-was="tab"], [data-toggle-was="pill"]')
              .each(function () {
                var t = s(this),
                  a = t.attr("href").replace(/-collapse$/g, "");
                t.attr({
                  "data-toggle": t.attr("data-toggle-was"),
                  "data-toggle-was": "",
                  "data-parent": "",
                  href: a,
                });
              }),
          this.$tabs.trigger(s.Event("shown-tabs.bs.tabcollapse")));
      }),
      (n.prototype.getTabContentElement = function () {
        var t = s(this.options.tabContentSelector);
        return 0 === t.length ? this.$tabs.siblings(".tabs-body") : t;
      }),
      (n.prototype.showAccordion = function () {
        this.$tabs.trigger(s.Event("show-accordion.bs.tabcollapse"));
        var e,
          t = this.$tabs.find(
            'li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]',
          ),
          o = this;
        (t.each(function () {
          var t = s(this),
            a = t.parent();
          (t.data("bs.tabcollapse.parentLi", a),
            o.$accordion.append(
              o._createAccordionGroup(o.$accordion.attr("id"), t.detach()),
            ));
        }),
          this.options.updateLinks &&
            ((e = this.$accordion.attr("id")),
            this.$accordion
              .find(".js-tabcollapse-panel-body")
              .find('[data-toggle="tab"], [data-toggle="pill"]')
              .each(function () {
                var t = s(this),
                  a = t.attr("href") + "-collapse";
                t.attr({
                  "data-toggle-was": t.attr("data-toggle"),
                  "data-toggle": "collapse",
                  "data-parent": "#" + e,
                  href: a,
                });
              })),
          this.$tabs.trigger(s.Event("shown-accordion.bs.tabcollapse")));
      }),
      (n.prototype._panelHeadingToTabHeading = function (t) {
        var a = t.attr("href").replace(/-collapse$/g, "");
        return (
          t.attr({ "data-toggle": "tab", href: a, "data-parent": "" }),
          t
        );
      }),
      (n.prototype._tabHeadingToPanelHeading = function (t, a, e, o) {
        return (
          t.addClass("js-tabcollapse-panel-heading " + (o ? "" : "collapsed")),
          t.attr({
            "data-toggle": "collapse",
            "data-parent": "#" + e,
            href: "#" + a,
          }),
          t
        );
      }),
      (n.prototype._checkStateOnResize = function () {
        var t = this;
        s(window).resize(function () {
          (clearTimeout(t._resizeTimeout),
            (t._resizeTimeout = setTimeout(function () {
              t.checkState();
            }, 100)));
        });
      }),
      (n.prototype._initAccordion = function () {
        var t =
          ((t = this.$tabs.attr("id")) ||
            (function () {
              for (
                var t = "",
                  a =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                  e = 0;
                e < 5;
                e++
              )
                t += a.charAt(Math.floor(Math.random() * a.length));
              return t;
            })()) + "-accordion";
        ((this.$accordion = s(
          '<div class="panel-group ' +
            this.options.accordionClass +
            '" id="' +
            t +
            '"></div>',
        )),
          this.$tabs.after(this.$accordion),
          this.$tabs.addClass(this.options.tabsClass),
          this.getTabContentElement().addClass(this.options.tabsClass));
      }),
      (n.prototype._createAccordionGroup = function (t, a) {
        var e = a.attr("data-target"),
          o = a.data("bs.tabcollapse.parentLi").is(".active"),
          e = e || ((e = a.attr("href")) && e.replace(/.*(?=#[^\s]*$)/, "")),
          n = s(e),
          i = n.attr("id") + "-collapse";
        return (
          (e = s(this.options.accordionTemplate(a, i, t, o)))
            .find(".panel-heading > .panel-title")
            .append(this._tabHeadingToPanelHeading(a, i, t, o)),
          e
            .find(".panel-body")
            .append(n.contents().detach())
            .data("bs.tabcollapse.tabpane", n),
          e
        );
      }),
      (s.fn.tabCollapse = function (o) {
        return this.each(function () {
          var t = s(this),
            a = t.data("bs.tabcollapse"),
            e = s.extend({}, n.DEFAULTS, t.data(), "object" == typeof o && o);
          a || t.data("bs.tabcollapse", new n(this, e));
        });
      }),
      (s.fn.tabCollapse.Constructor = n));
  })(window.jQuery),
  $("#tabsCollapse.nav-tabs").on("click", "li", function () {
    ($(".nav-tabs li.active").removeClass("active"),
      $(this).addClass("active"));
  }));
