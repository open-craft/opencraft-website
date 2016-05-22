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
            refreshInterval: 0,
            globalSceneOptions: {
                offset: -80
            }
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
                    !app.is_mobile && canvas.pause();
                })
                // .addIndicators()
                .addTo(this._scrollmagic_controller);

        }
    },
    /*_initEvents: function() {
        // console.info('home._initEvents');

        var _this = this;

    }*/
    _buildSections: function() {
        var _this = this;

        // title of section
        $('.js-section-title').each(function(i, title) {

            TweenLite.set(title, { x: -40, opacity: 0 });

            // build ScrollMagic scene to kwow when title is visible
            new ScrollMagic.Scene({
                    triggerElement: title
                })
                .on('enter', function(e) {
                    TweenLite.to(
                        title,
                        0.75,
                        {
                            x: 0,
                            opacity: 1,
                            force3D: true,
                            onComplete: function() {
                                $(this.target).addClass('is-visible');
                            }
                        }
                    );
                })
                // .addIndicators({ name: 'title ' + i })
                .addTo(_this._scrollmagic_controller);

        });

        // Squares for clients from 2nd section
        TweenLite.set('.js-client', { scale: 0 });
        // build ScrollMagic scene to kwow when clients are visible
        new ScrollMagic.Scene({
                triggerElement: '#js-clients'
            })
            .on('enter', function(e) {
                TweenMax.staggerTo(
                    '.js-client',
                    0.75,
                    {
                        scale: 1,
                        force3D: true
                    },
                    0.15
                );
            })
            // .addIndicators({ name: 'clients' })
            .addTo(_this._scrollmagic_controller);

        // Cells for "Your need" section (3rd)
        TweenLite.set('.js-your-need-cell', { y: 40, opacity: 0 });
        // build ScrollMagic scene to kwow when cells are visible
        new ScrollMagic.Scene({
                triggerElement: '#js-your-need-cells'
            })
            .on('enter', function(e) {
                TweenMax.staggerTo(
                    '.js-your-need-cell',
                    0.75,
                    {
                        y: 0,
                        opacity: 1,
                        force3D: true
                    },
                    0.375
                );
            })
            // .addIndicators({ name: 'clients' })
            .addTo(_this._scrollmagic_controller);

        // fadeInUp effect
        $('.js-fadeInUp').each(function(i, element) {

            // build ScrollMagic scene to kwow when element is visible
            new ScrollMagic.Scene({
                    triggerElement: element,
                })
                .on('enter', function(e) {
                    TweenLite.to(
                        element,
                        0.75,
                        {
                            y: 0,
                            opacity: 1,
                            force3D: true
                        }
                    );
                })
                // .addIndicators({ name: 'fadeInUp ' + i })
                .addTo(_this._scrollmagic_controller);

            TweenLite.set(element, { y: 40, opacity: 0 });

        });

        // fadeInLeft effect
        $('.js-fadeInLeft').each(function(i, element) {

            // build ScrollMagic scene to kwow when element is visible
            new ScrollMagic.Scene({
                    triggerElement: element
                })
                .on('enter', function(e) {
                    TweenLite.to(
                        element,
                        0.75,
                        {
                            x: 0,
                            opacity: 1,
                            force3D: true
                        }
                    );
                })
                // .addIndicators({ name: 'fadeInLeft ' + i })
                .addTo(_this._scrollmagic_controller);

            TweenLite.set(element, { x: 40, opacity: 0 });

        });

        // fadeInRight effect
        $('.js-fadeInRight').each(function(i, element) {

            // build ScrollMagic scene to kwow when element is visible
            new ScrollMagic.Scene({
                    triggerElement: element
                })
                .on('enter', function(e) {
                    TweenLite.to(
                        element,
                        0.75,
                        {
                            x: 0,
                            opacity: 1,
                            force3D: true
                        }
                    );
                })
                // .addIndicators({ name: 'fadeInRight ' + i })
                .addTo(_this._scrollmagic_controller);

            TweenLite.set(element, { x: -40, opacity: 0 });

        });
    }
};

$(function() {
	home.init();
});
