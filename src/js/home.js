var home = {
    
    // constants
    __NAMESPACE__: '.home',
    
    // private

    // public

    // DOM public elements

    // DOM private elements

    // functions
    init: function() {
        // console.info('home.init');
        
        var _this = this;

        this._initPlugins();
        // this._initEvents();
    },
    /*destroy: function() {
        // console.info('home.destroy');

        // remove variables

    },*/
    _initPlugins: function() {
        // console.info('home._initPlugins');

        var _this = this;

        if (typeof canvas !== 'undefined') {

            // build ScrollMagic scene to play/pause canvas
            var controller = new ScrollMagic.Controller();

            new ScrollMagic.Scene({
                    triggerElement: '#intro',
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

        }
    },
    /*_initEvents: function() {
        // console.info('home._initEvents');

        var _this = this;

    }*/
};

$(function() {
	home.init();
});
