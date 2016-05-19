var form = {

	// PRIVATE
	// Here go the private variables

	// PUBLIC
	// Here go the public variables
	$checkboxes: null,

	// DOM public elements

	// DOM private elements

	// FUNCTIONS
	init: function() {

		if (!document.forms.length) {
			return;
		}

		this.$checkboxes = $('.js-checkbox');

		this._initPlugins();
		// this._initEvents();
	},
	
	_initPlugins: function(){
		var _this = this;

		var options = {
			checkboxClass: 'checkbox',
			hoverClass: 'checkbox--hover',
			focusClass: 'checkbox--focus',
			checkedClass: 'checkbox--checked',
			activeClass: 'checkbox--active',
		};

		this.$checkboxes.iCheck(options);
		
		$( 'input[type="file"]' ).on( 'change', function( e ) {
	        
	        var filename = this.value.split( '\\' ).pop();
	        // Write filename into next sibling element
	        $('.js-input-file-label').text(filename);
	    });
	}
};

$(function() {

    form.init();

});