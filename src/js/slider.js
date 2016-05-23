var slider = {

	// PRIVATE

	// PUBLIC
	// Here go the public variables
	selector: '.js-slider',

	// DOM public elements

	// DOM private elements
	_buttonCurrent: 'slider__button--is-current',
	_dotCurrent: 'slider__dot--is-current',

	// FUNCTIONS
	init: function() {
		this._initPlugins();
		this._initEvents();
	},
	
	_initPlugins: function(){
		var _this = this;

		// WALLOP
		_this._initSlider();
	},

	_initEvents: function(){
		var _this = this;

		$('.js-sliders')
			.on('_before', function() {
				// console.log('tab change _before');
		  		// pause sliders when tabs change
		  		$(_this.selector).trigger('pause.slider');
			})
			.on('_after', function() {
				// console.log('tab change _after');
		  		// play active slider after tabs change
		  		var tab_item = $(this).find('li.active');
		  		if (!tab_item) {
		  			return;
		  		}

		  		var tab = tab_item.find('a').attr('href');
		  		if (!tab) {
		  			return;
		  		}

		  		var $slider = $(tab);
		  		if (!$slider.length) {
		  			return;
		  		}

		  		$slider.trigger('play.slider', [true]);
			})
			.trigger('_after');
	},

	_initSlider: function () {
		// This variable refers to the application itself
		var _this = this;

		// WALLOP OPTIONS
		// https://github.com/peduarte/wallop
		var options = 
		{ 
			buttonPreviousClass: 'slider__button-previous',
	      	buttonNextClass: 'slider__button-next',
	      	itemClass: 'slider',
	      	currentItemClass: 'slider--is-current',
	      	showPreviousClass: 'slider--show-previous',
	      	showNextClass: 'slider--show-next',
	      	hidePreviousClass: 'slider--hide-previous',
	      	hideNextClass: 'slider--hide-next', 
			// Carousel option is for a loop in slide
			carousel: true
		};

		// For each slider find in the document
		$(this.selector).each(function(i, slider_container) {

			var slider = new Wallop(slider_container, options);

			var $slider_container = $(slider_container);

			// https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
			// Request animation frame
			var rafId = null;
			var lastTime = 0;
			// pause by default, play will be triggered later
			var isPaused = true;

			// slider can play automatically with this data attribute
			var timer = $slider_container.data('autoplay');
			if (timer === undefined || timer == false) {
				timer = 0;
			} else if (timer == true) {
				timer = 3000;
			} else {
				timer = parseInt(timer); // in milliseconds
			}

			// AUTOPLAY
			// http://codepen.io/peduarte/pen/RapQBB
			var _autoplay = function(reset) {

				// If reset is not set when _autoplay is called
				if (typeof reset === 'undefined') {
					// So reset is false
					reset = false;
				}

				// If reset is defined
				if (!!reset) {
					// If there is a current animation.
					if (rafId) {
						// KILL IT!
						cancelAnimationFrame(rafId);
					}
					// We reset the lastTime call
					lastTime = 0;
				}

				// If  or the animation is paused.
				if (!timer || isPaused) {
					return;
				}
				  
			  	function frame(timestamp) {
			  		if (!lastTime) {
			  			lastTime = timestamp;
			  		}

				    var update = timestamp - lastTime >= timer;
				  
				    if (update) {
				      	slider.next();
				    } else {
				    	rafId = requestAnimationFrame(frame);
				    }
			  	}

			  	rafId = requestAnimationFrame(frame);

			};

			// PAUSE ON HOVER
			$(slider_container)
				.on('mouseenter.slider', function() {
					// On mouseenter pause the animation
					$(this).trigger('pause.slider');
				})
				.on('mouseleave.slider', function() {
					// On mouseleave, resume the animation
					$(this).trigger('play.slider');
				})
				.on('play.slider', function(e, reset) {
					// set pause to true
					isPaused = false;
					// Call _autoplay
					_autoplay(reset);
				})
				.on('pause.slider', function() {
					// If there is a current animation. (ID) 
					if (rafId) {
						// KILL IT!
						cancelAnimationFrame(rafId);
					}
					// then pause the animation
					isPaused = true;
				});

			// DOTS
			// http://codepen.io/peduarte/pen/bVbZLK?editors=0010
			
			// build slider nav dots
			var $nav = $('.js-slider-nav', slider_container);
			if ($nav.length) {
				var _dots = [];
				for (var _i = 0, _nb = slider.allItemsArray.length; _i < _nb; _i++) {
					_dots.push('<button class="slider__dot js-slide-dot' + (_i === 0 ? ' ' + _this._dotCurrent : '') + '"></button>');
				}

				$nav
					.html(_dots.join(''))
					.on('click', '.js-slide-dot', function() {
					    slider.goTo($(this).index());
					});
			}

			// BUTTONS
			var $paginationButtons = $('.js-slide-button', slider_container);
			var $paginationButtonsWrapper = $('.js-slide-button-wrapper', slider_container);

			$paginationButtonsWrapper.on('click', function() {

				// console.log($(this).index());
			    slider.goTo($(this).index());
			});

			// CHANGE
			slider.on('change', function(event, callback) {

				_autoplay(true);

				$('.' + _this._buttonCurrent, slider_container).removeClass(_this._buttonCurrent);
				$('.' + _this._dotCurrent, slider_container).removeClass(_this._dotCurrent);

				// https://api.jquery.com/eq/
				// Reduce the set of matched elements to the one at the specified index.
				if ($nav.length) {
	  				$nav.find('.js-slide-dot:eq(' + event.detail.currentItemIndex + ')').addClass(_this._dotCurrent);
	  			}

	  			$paginationButtons.eq(event.detail.currentItemIndex).addClass(_this._buttonCurrent);

			});

			var force_height = $slider_container.data('force-height');

			if (force_height !== undefined && force_height != false) {
				// RESIZE
				// set each slide same height from the tallest one
				var _resize = function() {
					var maxheight = 0;

					var $items = $(slider.allItemsArray);
					if (!app.is_mobile) {
						$items
							.each(function() {
								maxheight = Math.max($(this).css('height', 'auto').outerHeight(), maxheight);
							})
							.outerHeight(maxheight);
					} else {
						$items.outerHeight('auto');
					}
				};

				$(window)
					.on('resize.slider', function() {
						_resize();
					})
					.trigger('resize.slider');
			}

		});
	}
};

$(function() {
    slider.init();
});
