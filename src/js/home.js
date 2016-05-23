var home = {
    
    // constants
    __NAMESPACE__: '.home',
    
    // private
    _scrollmagic_controller: null,

    // public

    // DOM public elements

    // DOM private elements

    // functions
    init: function() {
        // console.info('home.init');
        
        var _this = this;

        this._initPlugins();
        // this._initEvents();
        
        this._buildSections();
    },
    /*destroy: function() {
        // console.info('home.destroy');

        // remove variables

    },*/
    _initPlugins: function() {
        // console.info('home._initPlugins');

        var _this = this;

        // build ScrollMagic container for later usage
        this._scrollmagic_controller = new ScrollMagic.Controller({
            refreshInterval: 0
        });

        if (typeof canvas !== 'undefined') {

            // build ScrollMagic scene to play/pause canvas
            new ScrollMagic.Scene({
                    triggerElement: '#intro',
                    triggerHook: 'onLeave',
                    duration: '100%'
                })
                .on('enter', function(e) {
                    // play animation in canvas if visible, except mobile
                    !app.is_mobile && canvas.play();
                })
                .on('leave', function(e) {
                    // pause animation in canvas if no longer visible, except mobile
                    e.scrollDirection === 'FORWARD' && !app.is_mobile && canvas.pause();
                })
                // .addIndicators({ name: 'canvas' })
                .addTo(this._scrollmagic_controller);

        }
    },
    /*_initEvents: function() {
        // console.info('home._initEvents');

        var _this = this;

    }*/
    _buildSections: function() {
        var _this = this;

        // timeline for each section
        $('.js-section-intro, .js-section').each(function(i, section) {

            // build timeline with all tweens from current section
            var tl = new TimelineLite({ paused: true });

            // add animatable elements to the timeline
            $('.js-show-when-visible', section).each(function(j, el) {
                
                var animation = $(el).data('animation');
                if (!animation) {
                    return;
                }

                switch(animation) {
                    case 'sectionTitle':
                        // add tween to timeline
                        tl.fromTo(
                            el,
                            0.75,
                            {
                                x: -40,
                                opacity: 0
                            },
                            {
                                x: 0,
                                opacity: 1,
                                force3D: true,
                                onComplete: function() {
                                    $(this.target).addClass('is-visible');
                                }
                            }
                        );

                        break;

                    case 'fadeInRight':
                        tl.fromTo(
                            el,
                            0.75,
                            {
                                x: -40,
                                opacity: 0
                            },
                            {
                                x: 0,
                                opacity: 1,
                                force3D: true
                            },
                            j ? '-=0.375' : '+=0'
                        );

                        break;

                    case 'fadeInUp':
                        tl.fromTo(
                            el,
                            0.75,
                            {
                                y: 40,
                                opacity: 0
                            },
                            {
                                y: 0,
                                opacity: 1,
                                force3D: true
                            },
                            j ? '-=0.375' : '+=0'
                        );

                        break;

                    case 'zoomIn':
                        tl.fromTo(
                            el,
                            0.75,
                            {
                                scale: 0
                            },
                            {
                                scale: 1,
                                force3D: true
                            },
                            j ? '-=0.6' : '+=0'
                        );

                        break;

                    default:
                        break;
                }

            });

            // build ScrollMagic scene to kwow when section is visible
            new ScrollMagic.Scene({
                    triggerElement: section,
                    triggerOffset: 80
                })
                .on('enter', function(e) {
                    tl.play();
                })
                // .addIndicators({ name: 'section ' + i })
                .addTo(_this._scrollmagic_controller);

        });

    }
};

$(function() {
	home.init();
});
