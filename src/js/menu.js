var menu = {
    
    // constants
    __NAMESPACE__: '.menu',

    // private
    _stay_open: true,
    _is_open: false,
    _is_hovered: false,
    _current_index: -1,
    _menu_width: 0,

    // public
    height: 0,

    // DOM public elements
    $el: null,

    // DOM private elements
    _$items: null,

    // functions
    init: function() {
        // console.info('menu.init');

        this.$el = $('#js-site-nav');

        if (!this.$el.length) return;

        this._$items = $('.js-site-menu-item');

        this.height = this.$el.outerHeight(true);
        this._menu_width = $('#js-site-menu').outerWidth();

        this._stay_open = true;
        this._is_open = false;
        this._is_hovered = false;
        this._current_index = -1;

        TweenLite.set('#js-site-menu', { x: this._menu_width, autoAlpha: 1 });

        this.open(0.5);

        this._initPlugins();
        this._initEvents();
    },
    /*destroy: function() {
        // console.info('menu.destroy');

        // unbind event listeners
        $(window).off(this.__NAMESPACE__);
        $(document).off(this.__NAMESPACE__);

        // remove variables
        this.$el = null;
    },*/
    _initPlugins: function() {
        // console.info('menu._initPlugins');

        var _this = this;

        var controller = new ScrollMagic.Controller({ refreshInterval: 0 });

        // build ScrollMagic scene to change menu color regarding sections background color
        $('.js-section-anchor').each(function(i, anchor) {

	        new ScrollMagic.Scene({
	                triggerElement: anchor,
	                triggerHook: 'onLeave',
	                offset: (_this.height / 2 * -1)
	            })
	            .on('enter leave', function(e) {
	                // console.log('section', i);
	                var $anchor = $(e.target.triggerElement());

	                if (e.scrollDirection === 'FORWARD') {
	                	var color = $anchor.data('color-down');
	                } else if (e.scrollDirection === 'REVERSE') {
	                	var color = $anchor.data('color-up');
	                }

	                _this.$el
	                	.removeClass('color-white color-black')
	                	.addClass('color-' + color);
	            })
	            // .addIndicators({ name: 'anchor ' + i, colorTrigger: 'yellow' })
	            .addTo(controller);
	    });

	    // build ScrollMagic scene to update active section in menu
	    $('.js-section').each(function(i, section) {

	    	new ScrollMagic.Scene({
	                triggerElement: section,
	                triggerHook: 'onLeave',
	                offset: -1
	            })
	    		.on('enter', function(e) {
	    			// console.log('enter section', i);

	    			_this.update(i);
	    		})
	    		.on('leave', function(e) {
	    			// console.log('leave section', i);

	    			_this.update((i - 1));
	    		})
	    		// .addIndicators({ name: 'section ' + i })
	    		.addTo(controller);

	    });
    },
    _initEvents: function() {
        // console.info('menu._initEvents');

        var _this = this;

        this.$el.hover(
        	function() {
        		_this._is_hovered = true;
        		_this.open();
        	},
        	function() {
        		_this._is_hovered = false;
        		_this.close();
        	}
        );

        $(window)
        	.on('autoScrollComplete' + this.__NAMESPACE__, function() {
        		_this.update(_this._current_index);
        	})
        	.one('scroll' + this.__NAMESPACE__, function(e) {
        		// hide menu on first scroll
        		_this._stay_open = false;
        		_this.close();
        	})
    },
    open: function(delay) {
    	// console.info('menu.open');
    	
    	if (this._is_open) {
    		return;
    	}

    	if (typeof delay === 'undefined') {
    		delay = 0;
    	}

    	delay = parseFloat(delay);

    	var vars = {
    		x: 0,
    		force3D: true,
    		ease: Power2.easeOut
    	};

    	if (delay > 0) {
    		vars.delay = delay;
    	}

    	TweenLite.killTweensOf('#js-site-menu');
    	TweenLite.killTweensOf(this._$items);

    	TweenLite.to('#js-site-menu', 0.8, vars);
    	TweenLite.to(this._$items, 0.8, { autoAlpha: 1 });

    	this._is_open = true;
    },
    close: function() {
    	// console.info('menu.close');
    	
    	if (!this._is_open || this._stay_open || this._is_hovered) {
    		return;
    	}

    	// reset menu width var
    	this._menu_width = $('#js-site-menu').outerWidth();

    	TweenLite.killTweensOf('#js-site-menu');

    	TweenLite.to(
        	'#js-site-menu',
        	0.4,
        	{
        		x: this._menu_width,
        		force3D: true,
        		ease: Sine.easeIn,
        		onComplete: function() {
        			// TweenLite.set(this._$items, { autoAlpha: 0 });

        			this.update(this._current_index);
        		},
        		onCompleteScope: this
        	}
        );

        this._is_open = false;
    },
    update: function(index) {
    	index = parseInt(index);

    	var previous_index = this._current_index;
    	this._current_index = index;

    	// console.log(previous_index, index);

    	if (this._stay_open || this._is_hovered || app.is_auto_scrolling) {
    		return;
    	}

    	var $item = this._$items.eq(index);

    	// reset menu width var
    	this._menu_width = $('#js-site-menu').outerWidth();

    	TweenLite.killTweensOf('#js-site-menu');
    	TweenLite.killTweensOf(this._$items);

    	var tl = new TimelineLite();

    	if (previous_index !== index && previous_index >= 0) {
    		var $previous_item = this._$items.eq(previous_index);

	    	tl
	    		.fromTo(
	    			'#js-site-menu',
	    			0.3,
	    			{
	    				x: (this._menu_width - ($previous_item.position().left + $previous_item.outerWidth()))
	    			},
	    			{
	    				x: '+=' + $previous_item.outerWidth(),
	    				force3D: true,
	    				ease: Sine.easeIn
	    			}
	    		);
    	}

    	if (index < 0 || index >= this._$items.length) {
    		tl.set(
    			this._$items,
    			{
    				autoAlpha: 1
    			}
    		);

    		return;
    	}

    	tl
    		.set(
    			this._$items,
    			{
    				autoAlpha: 0
    			}
    		)
    		.set(
    			$item,
    			{
    				autoAlpha: 1
    			}
    		)
    		.fromTo(
    			'#js-site-menu',
    			0.3,
    			{
    				x: (this._menu_width - $item.position().left)
    			},
    			{
    				x: '-=' + $item.outerWidth(),
    				force3D: true,
    				ease: Power2.easeOut
    			}
    		);
    }
};

$(function() {
	menu.init();
});
