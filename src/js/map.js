var map = {
    
    // constants
    __NAMESPACE__: '.map',

    // private

    // public
    width: 0,
    height: 0,

    // DOM public elements
    $el: null,

    // DOM private elements

    // functions
    init: function() {
        // console.info('map.init');

        this.$el = $('#js-map');

        if (!this.$el.length) return;

        this.width = parseInt(this.$el.data('width'));
        this.height = parseInt(this.$el.data('height'));

        this._setMarkers(150);

        // this._initPlugins();
        // this._initEvents();
    },
    /*destroy: function() {
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


    },
    _initEvents: function() {
        // console.info('map._initEvents');

        var _this = this;


    }*/
    _setMarkers: function(delay) {
    	if (typeof delay === 'undefined') {
    		delay = 0;
    	}

    	delay = parseInt(delay);

    	var _this = this;

    	var $markers = $('.js-map-marker');
    	if (!$markers.length) {
    		return;
    	}

    	$markers
    		// shuffle collection before display it
    		// https://css-tricks.com/snippets/javascript/shuffle-array/#article-header-id-2
    		.sort(function() {
    			return 0.5 - Math.random();
    		})
    		// positionate each marker with its given coordinates
    		.each(function(i) {
	    		var $marker = $(this),
	    			coordinates = $marker.data('coordinates');

	    		if (coordinates === undefined || coordinates.indexOf(',') === -1) {
	    			return;
	    		}

	    		coordinates = coordinates.split(',');

	    		// y = latitude, first coordinate
	    		// x = longitude, last coordinate

	    		// add a delay between each markers if set
	    		setTimeout(function() {
		    		$marker
			    		.css({
			    			top: (parseInt(coordinates[0]) / _this.height * 100) + '%',
			    			left: (parseInt(coordinates[1]) / _this.width * 100) + '%'
			    		})
			    		// do not forget to show the marker
			    		.addClass('show');
			    }, (i * delay));
	    	});
    }
};

$(function() {
	map.init();
});
