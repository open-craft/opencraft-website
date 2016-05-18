var map = {
    
    // constants
    __NAMESPACE__: '.map',

    // private

    // public
    width: 0,
    height: 0,

    // DOM public elements
    $el: null,
    $markers: null,

    // DOM private elements

    // functions
    init: function() {
        // console.info('map.init');

        this.$el = $('#js-map');

        if (!this.$el.length) return;

        this.$markers = $('.js-map-marker');

        this.width = parseInt(this.$el.data('width'));
        this.height = parseInt(this.$el.data('height'));

        this._setMarkers();

        this._initPlugins();
        // this._initEvents();
    },
    destroy: function() {
        // console.info('map.destroy');

        // unbind event listeners
        $(window).off(this.__NAMESPACE__);
        $(document).off(this.__NAMESPACE__);

        // remove variables
        this.$el = null;
    },
    _initPlugins: function() {
        // console.info('map._initPlugins');

        var _this = this;

        // build ScrollMagic scene to display markers when map is visible
        var controller = new ScrollMagic.Controller();

        new ScrollMagic.Scene({
                triggerElement: '#js-map-anchor',
                triggerHook: 'onEnter',
                offset: -250,
                reverse: false
            })
            .on('enter', function(e) {
                _this._showMarkers(150);
            })
            // .addIndicators()
            .addTo(controller);
    },
    /*_initEvents: function() {
        // console.info('map._initEvents');

        var _this = this;


    },*/
    _setMarkers: function(delay) {
    	var _this = this;

    	// positionate each marker with its given coordinates
    	this.$markers
    		.each(function(i) {
	    		var $marker = $(this),
	    			coordinates = $marker.data('coordinates');

	    		if (coordinates === undefined || coordinates.indexOf(',') === -1) {
	    			return;
	    		}

	    		coordinates = coordinates.split(',');

	    		// y = latitude, first coordinate
	    		// x = longitude, last coordinate
	    		$marker.css({
	    			top: (parseInt(coordinates[0]) / _this.height * 100) + '%',
	    			left: (parseInt(coordinates[1]) / _this.width * 100) + '%'
	    		});
	    	});
    },
    _showMarkers: function(delay) {
    	var _this = this;

    	if (typeof delay === 'undefined') {
    		delay = 0;
    	}

    	delay = parseInt(delay);

    	this.$markers
    		// shuffle collection before display it
    		// https://css-tricks.com/snippets/javascript/shuffle-array/#article-header-id-2
    		.sort(function() {
    			return 0.5 - Math.random();
    		})
    		.each(function(i) {
	    		var $marker = $(this);

	    		// add a delay between each markers if set
	    		setTimeout(function() {
		    		$marker.addClass('show');
			    }, (i * delay));
	    	});
    }
};

$(function() {
	map.init();
});
