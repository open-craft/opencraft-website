var app = {
    
    // constants
    __NAMESPACE__: '.app',
    
    // private
    _classBodyReady: 'is-ready',

    // public
    $body: null,
    $document: null,
    // DOM public elements

    // DOM private elements

    // functions
    init: function() {
        // console.info('app.init');
        this.$body = $('body');
        this.$document = $(document);

        this._initPlugins();
        this._initEvents();
    },
    destroy: function() {
        // console.info('app.destroy');

        // remove variables

    },
    _initPlugins: function() {
        // console.info('app._initPlugins');

        var _this = this;
    },
    _initEvents: function() {
        // console.info('app._initEvents');

        var _this = this;

        _this._onReady();

    },

    _onReady: function(){
        var _this = this;

        _this.$document.ready(function(){

            setTimeout(function(){
                _this.$body.addClass(_this._classBodyReady);
            }, 2000);

        });
    }
};

$(function() {
	app.init();
});
