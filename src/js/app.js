var app = {
    
    // constants
    __NAMESPACE__: '.app',

    // private
    _$shapes: [],

    // public
    viewport: {
        width: 0,
        height: 0
    },

    // DOM public elements

    // DOM private elements

    // functions
    init: function() {
        // console.info('app.init');
        
        this._$shapes = $('.shape-skewed-counterclockwise, .shape-skewed-clockwise');

        this.resize();

        this._initPlugins();
        this._initEvents();
    },
    destroy: function() {
        // console.info('app.destroy');

        // unbind event listeners
        $(window).off(this.__NAMESPACE__);
        $(document).off(this.__NAMESPACE__);

        // remove variables
        this.$el = null;
    },
    _initPlugins: function() {
        // console.info('app._initPlugins');

        var _this = this;

        // https://github.com/jonathantneal/svg4everybody
        svg4everybody();
    },
    _initEvents: function() {
        // console.info('app._initEvents');

        var _this = this;

        $(window)
        	.on('resize' + this.__NAMESPACE__, function(e) {
                _this.resize();
        	});

    },

    resize: function() {
        this._resetViewportDimensions();
        this._resizeShapes();
        this._resizePaper();
    },
    _resetViewportDimensions: function() {
        this.viewport.width = $(window).width();
        this.viewport.height = $(window).height();
    },
    _resizeShapes: function() {
    	if (!this._$shapes.length || feature.viewportUnit) {
    		return;
    	}

    	var shape_height = Math.round((200/1596 * this.viewport.width)),
    		shape_height_half = (shape_height / 2);

    	this._$shapes.each(function() {
    		$(this)
	    		.css({
		    		height: shape_height,
		    		marginTop: -(shape_height_half),
		    		marginBottom: -(shape_height_half)
		    	})
		    	.children()
		    	.css({
		    		top: -(shape_height_half),
		    		bottom: -(shape_height_half)
		    	});
    	});

    	$('.site-content')
    		.filter(':first-of-type')
        		.css('margin-bottom', -(shape_height + shape_height_half))
        		.end()
    		.filter('.site-content--has-padding-top')
        		.css('padding-top', shape_height)
        		.end()
    		.filter('.site-content--has-padding-bottom')
                .css('padding-bottom', shape_height);
    },
    _resizePaper: function() {
        // if w = 1260px, h = 895px, offset = -432px
        var w0 = 1260,
            h0 = 895,
            offset = -432;

        if (this.viewport.width < 1400) {
            offset = -469;
        }

        var dw = this.viewport.width - w0,
            dh = this.viewport.height - h0;

        var offset = (offset + (dw / 4) - dh);

        $('.js-background-paper')
            .removeAttr('style')
            .css('background-position', function(i, value) {
                var values = value.split(' ');

                return values[0] + ' ' + Math.round(offset) + 'px';
            });
    }

};

$(function() {
	app.init();
});
