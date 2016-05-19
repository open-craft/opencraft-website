var form = {

	// PRIVATE
	// Here go the private variables
	_slider_container: null,

	// PUBLIC
	// Here go the public variables
	$selectors: $('.js-checkbox'),
	$selectorsLabelFile : $('.js-input-file-label'),
	timer: 3000,

	// DOM public elements
	$body: null,

	// DOM private elements
	_$currentSlide: null,

	// FUNCTIONS
	init: function() {
		this.$body = $('body');
		this._initPlugins();
		// this._initEvents();
	},
	
	_initPlugins: function(){
		var _this = this;

		_this._initForm();
	},

	_initEvents: function(){
		var _this = this;
	},

	_initForm: function (){
		// This variable refers to the application itself
		var _this = this;

		_this.checkbox();
		_this.inputFile();
	},

	checkbox: function(){
		// This variable refers to the application itself
		var _this = this;

		options = {
			checkboxClass: 'checkbox',
			hoverClass: 'checkbox--hover',
			focusClass: 'checkbox--focus',
			checkedClass: 'checkbox--checked',
			activeClass: 'checkbox--active',
		};
		_this.$selectors.iCheck(options);
	},

	inputFile: function(){
		var _this = this;

		$( 'input[type="file"]' ).on( 'change', function( e ) {
	        
	        var filename = this.value.split( '\\' ).pop();
	        // Write filename into next sibling element
	        _this.$selectorsLabelFile.text(filename);
	    });
	}

};

$(function() {

    form.init();

});