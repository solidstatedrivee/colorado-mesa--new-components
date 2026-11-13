  /* initialize jcarousel */

(function ($) {

    $(function() {

        var jcarousel = $('.carousel-stage');
        jcarousel

            .on('jcarousel:reload jcarousel:create', function () {
                var width = jcarousel.innerWidth();
                if (width >= 767) {
                    width = width / 1;
				} else if (width >= 400) {
                    width = width / 1;
				} else if (width <= 400) {
                    width = width / 1;
                } 

                jcarousel.jcarousel('items').css('width', width + 'px');

            })
			// Bind _before_ carousel initialization
            .on('jcarousel:targetin', 'li', function() {
                $(this).addClass('visible-stage');
				
            })
            .on('jcarousel:targetout', 'li', function() {
                $(this).removeClass('visible-stage');
				
            })
            .jcarousel({
                wrap: 'circular',
				//pauseOnMouseOver: true // This is the configuration parameter
            })

			.jcarouselAutoscroll({
            interval: 5000,
            target: '+=1',
            autostart: true,
// 			autostart: false
			scroll: 1
        });
    });

})(jQuery);

/*Bootstrap Slider initialization (only slide on the visible stage)*/
function carouselRun() {
	$('.visible-stage .carousel').carousel('cycle');
}

$( window ).on( "load", carouselRun ); 

$('.button-tab').click(function (){
	//console.log('clicked')
	$('.carousel').carousel('pause');
	
	setTimeout(function () {
		carouselRun();
	}, 200);
	
});
	
//Custom Lazy Loading - load images as they slide
//https://stackoverflow.com/questions/27675968/lazy-load-not-work-in-bootstrap-carousel
	var cHeight = 0;

$('.mcarousel .carousel').on('slide.bs.carousel', function (e) {
        var $nextImage = $(e.relatedTarget).find('img');

        var $activeItem = $('.active.carousel-item', this);

        // prevents the slide decrease in height
        if (cHeight == 0) {
           cHeight = $(this).height();
           $activeItem.next('.carousel-item').height(cHeight);
        }

        // prevents the loaded image if it is already loaded
        var src = $nextImage.data('src');
        
        if (typeof src !== "undefined" && src != "") {
           $nextImage.attr('src', src)
           $nextImage.data('src', '');
        }
    });
		

		
/*Jcarousel Controls*/

(function ($) {

$(function() {

    $('.mcarousel').jcarousel({

        // Core configuration goes here

    });

    $('.jcarousel-control-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-control-next').jcarouselControl({
        target: '+=1'
    });
});

})(jQuery);




(function($) {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
					
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
    });
	

	
})(jQuery);