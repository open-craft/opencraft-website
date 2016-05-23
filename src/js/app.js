var app = {
    
    // constants
    __NAMESPACE__: '.app',
    
    // private
    _body_scrollLeft: 0,
    _body_scrollTop: 0,
    _class_body_ready: 'is-ready',
    _scroll_top: -1,

    // public
    viewport: {
        width: 0,
        height: 0
    },
    is_mobile: true,
    is_auto_scrolling: false,

    // DOM public elements
    $body: null,

    // DOM private elements

    // functions
    init: function() {
        // console.info('app.init');
        
        var _this = this;
        
        this.$body = $('body');

        this.is_mobile = true;
        this.is_touch = feature.touch && !navigator.userAgent.match(/Trident\/7\./);
        this.is_auto_scrolling = false;
        this._scroll_top = -1;

        this.resize();

        this._initPlugins();
        this._initEvents();
        
        setTimeout(function(){
            _this.$body.addClass(_this._class_body_ready);
        }, 2000);
    },
    destroy: function() {
        // console.info('app.destroy');

        // remove variables

    },
    _initPlugins: function() {
        // console.info('app._initPlugins');

        var _this = this;

        // SVG4Everybody
        // https://github.com/jonathantneal/svg4everybody
        svg4everybody();

        // tabslet
        // http://vdw.github.io/Tabslet/
        
        $('.js-tabs').tabslet({
            container: '.js-tabs-container',
            animation: true
        });

    },
    _initEvents: function() {
        // console.info('app._initEvents');

        var _this = this;

        $(document)
            .on('click', '[data-scrollto]', function(e) {
                var selector = $(this).data('scrollto'),
                    $element = $(selector);
                    
                if (!$element.length) {
                    return;
                }

                e.preventDefault();

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
                            $(window).trigger('autoScrollStart');
                        },
                        onComplete: function() {
                            $(window).trigger('autoScrollComplete');
                        }
                    }
                );
            });

        $(window)
            .on('scroll' + this.__NAMESPACE__, function(e) {
                if (_this._scroll_top < 0) {
                    // first scroll event fired by browser, do not propagate
                    e.stopImmediatePropagation();
                }
                _this._scroll_top = $(this).scrollTop();
            })
            .on('autoScrollStart' + this.__NAMESPACE__, function() {
                // console.log('autoScrollStart.app');
                _this.is_auto_scrolling = true;
            })
            .on('autoScrollComplete' + this.__NAMESPACE__, function() {
                // console.log('autoScrollComplete.app');
                _this.is_auto_scrolling = false;
            })
            .on('resize' + this.__NAMESPACE__, function() {
                _this.resize();
            });

    },

    resize: function() {
        this._resetViewportDimensions();

        this.is_mobile = (this.viewport.width < 768);
    },
    _resetViewportDimensions: function() {
        this.viewport.width = $(window).width();
        this.viewport.height = $(window).height();
    },
    disableScroll: function() {
        // lock scroll position, but retain settings for later
        // http://stackoverflow.com/a/3656618
        this._body_scrollLeft = self.pageXOffset || document.documentElement.scrollLeft  || document.body.scrollLeft;
        this._body_scrollTop = self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
        $('html').css('overflow', 'hidden');
        window.scrollTo(this._body_scrollLeft, this._body_scrollTop);
        // disable scroll on touch devices as well
        if (this.is_touch) {
            $(document).on('touchmove.app', function(e) {
                e.preventDefault();
            });
        }
    },
    enableScroll: function(_position) {
        if (typeof _position === 'undefined') {
            _position = this._body_scrollTop;
        }

        var resume_scroll = true;
        if (typeof _position === 'boolean' && _position === false) {
            resume_scroll = false;
        }

        // unlock scroll position
        // http://stackoverflow.com/a/3656618
        $('html').css('overflow', 'visible');
        // resume scroll position if possible
        if (resume_scroll) {
            window.scrollTo(this._body_scrollLeft, _position);
        }
        // enable scroll on touch devices as well
        if (this.is_touch) {
            $(document).off('touchmove.app');
        }
    },

};

$(function() {
	app.init();
});
