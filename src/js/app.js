var app = {
    
    // constants
    __NAMESPACE__: '.app',
    
    // private
    _classBodyReady: 'is-ready',

    // public
    $body: null,

    // DOM public elements

    // DOM private elements

    // functions
    init: function() {
        // console.info('app.init');
        
        var _this = this;
        
        this.$body = $('body');

        this._initPlugins();
        // this._initEvents();
        
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
    }/*,
    _initEvents: function() {
        // console.info('app._initEvents');

        var _this = this;

    }*/
};

$(function() {
	app.init();
});
