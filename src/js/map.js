var map = {
    
    // constants
    __NAMESPACE__: '.map',

    // private

    // public

    // DOM public elements
    $el: null,

    // DOM private elements

    // functions
    init: function() {
        // console.info('map.init');

        this.$el = $('#js-map');

        if (!this.$el.length) return;

        this._setMarkers();

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
    _setMarkers: function() {
    	var $markers = $('.js-map-marker');
    	if (!$markers.length) {
    		return;
    	}

    	// positionate each marker with its given coordinates
    	$markers.each(function() {
    		var $marker = $(this),
    			coordinates = $marker.data('coordinates');

    		if (coordinates === undefined || coordinates.indexOf(',') === -1) {
    			return;
    		}

    		coordinates = coordinates.split(',');

    		// convert coordinates to rem
    		$marker
	    		.css({
	    			top: (parseInt(coordinates[0]) / 10) + 'rem',
	    			left: (parseInt(coordinates[1]) / 10) + 'rem'
	    		})
	    		.addClass('show');
    	});
    }
};

$(function() {
	map.init();
});
