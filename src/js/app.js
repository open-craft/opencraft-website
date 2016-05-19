var app = {
    
    // constants
    __NAMESPACE__: '.app',
    
    // private
    _classBodyReady: 'is-ready',

    // public
    is_auto_scrolling: false,

    // DOM public elements
    $body: null,

    // DOM private elements

    // functions
    init: function() {
        // console.info('app.init');
        
        var _this = this;
        
        this.$body = $('body');

        this.is_auto_scrolling = false;

        this._initPlugins();
        this._initEvents();
        
        setTimeout(function(){
            _this.$body.addClass(_this._classBodyReady);
        }, 2000);
    },
    destroy: function() {
        // console.info('app.destroy');

        // remove variables

    },
    _initPlugins: function() {
        // console.info('app._initPlugins');

        var _this = this;

        // build ScrollMagic scene to play/pause canvas
        var controller = new ScrollMagic.Controller();

        new ScrollMagic.Scene({
                triggerElement: '#js-header',
                triggerHook: 'onLeave',
                duration: '100%'
            })
            .on('enter', function(e) {
                // play animation in canvas if visible
                canvas.play();
            })
            .on('leave', function(e) {
                // pause animation in canvas if no longer visible
                canvas.pause();
            })
            // .addIndicators()
            .addTo(controller);
    },
    _initEvents: function() {
        // console.info('app._initEvents');

        var _this = this;

        $(document)
            .on('click', '[data-scrollto]', function(e) {
                e.preventDefault();

                var selector = $(this).data('scrollto');

                var $element = $(selector);
                if ($element.length) {
                    var offset = $element.offset().top;
                    TweenLite.to(
                        window, 
                        0.75,
                        {
                            scrollTo: {
                                y: offset,
                                onAutoKillScope: _this,
                                onAutoKill: function() {
                                    $(window).trigger('autoScrollComplete');
                                }
                            },
                            ease: Power1.easeInOut,
                            callbackScope: _this,
                            onStart: function() {
                                this.is_auto_scrolling = true;
                            },
                            onComplete: function() {
                                $(window).trigger('autoScrollComplete');
                            }
                        }
                    );
                }
            });

        $(window)
            .on('autoScrollComplete' + this.__NAMESPACE__, function() {
                // console.log('autoScrollComplete.app');
                _this.is_auto_scrolling = false;
            });

    }
};

$(function() {
	app.init();
});
