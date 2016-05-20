var app = {
    
    // constants
    __NAMESPACE__: '.app',
    
    // private
    _class_body_ready: 'is-ready',
    _scroll_top: -1,

    // public
    viewport: {
        width: 0,
        height: 0
    },
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

        // tabslet
        // http://vdw.github.io/Tabslet/
        
        $('.js-tabs').tabslet({
            container: '.js-tabs-container'
        });

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
            .on('scroll' + this.__NAMESPACE__, function(e) {
                if (_this._scroll_top < 0) {
                    // first scroll event fired by browser, do not propagate
                    e.stopImmediatePropagation();
                }
                _this._scroll_top = $(this).scrollTop();
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
    },
    _resetViewportDimensions: function() {
        this.viewport.width = $(window).width();
        this.viewport.height = $(window).height();
    },

};

$(function() {
	app.init();
});
