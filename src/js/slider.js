var slider = {

	// PRIVATE
	// Here go the private variables
	_slider_container: null,

	// PUBLIC
	// Here go the public variables
	selector: '.js-slider',
	timer: 3000,

	// DOM public elements

	// DOM private elements
	_$currentSlide: null,
	_buttonCurrent: 'slider__button--is-current',
	_dotCurrent: 'slider__dot--is-current',

	// FUNCTIONS
	init: function() {
		this._initPlugins();
		// this._initEvents();
	},
	
	_initPlugins: function(){
		var _this = this;

		// WALLOP
		_this._initSlider(0);

	},

	/*_initEvents: function(){
		var _this = this;
	},*/

	_initSlider: function (timer){
		// This variable refers to the application itself
		var _this = this;

		// If the argument timer is not set
		if (typeof timer === 'undefined') {
			// We set the timer to 3000 by default
			timer = this.timer;
		}

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

			// https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
			// Request animation frame
			var rafId = null;
			var lastTime = 0;
			var isPaused = false;

			// AUTOPLAY
			// http://codepen.io/peduarte/pen/RapQBB
			var _autoplay = function(reset){

				// If reset is not set when _autoplay is called
				if (typeof reset === 'undefined') {
					// So reset is false
					reset = false;
				}

				// If reset is defined
				if (reset) {
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
				.on('mouseenter', function() {

					// If there is a current animation. (ID) 
					if (rafId) {
						// KILL IT!
						cancelAnimationFrame(rafId);
					}
					// On mouseenter pause the animation
					isPaused = true;
				})
				.on('mouseleave', function() {
					// On mouseleave, set pause to true
					isPaused = false;
					// Call _autoplay
					_autoplay();
				});


			// DOTS
			// http://codepen.io/peduarte/pen/bVbZLK?editors=0010

			var $paginationDots = $('.js-slide-dot', slider_container);

			$paginationDots.on('click', function() {
			    slider.goTo($(this).index());
			});

			// BUTTON
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
	  			$paginationDots.eq(event.detail.currentItemIndex).addClass(_this._dotCurrent);

	  			$paginationButtons.eq(event.detail.currentItemIndex).addClass(_this._buttonCurrent);

			});
		});
	}
}

$(function() {

    slider.init();

});