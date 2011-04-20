// The plugin code
(function($){
    $.fn.parallax = function(options){
        var $$ = $(this);
        var offset = $$.offset();
        var defaults = {
            "start": 0,
            "stop": offset.top + $$.height(),
            "coeff": 0.95
        };
        var opts = $.extend(defaults, options);
        
        
		var initY = $$.data('startY');
		$$.css({
			"top": initY + "px"
		});
        
        
        return this.each(function(){
            $(window).bind('scroll', function() {
                windowTop = $(window).scrollTop();
                if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
                	var startY;
                	var pos = $$.position();
                	startY = $$.data('startY');
                	
                	//var startY = $$.data('startY');
                	//log(startY);
                    newCoord = startY + (windowTop * opts.coeff);
					

                    $$.css({
                        "top": newCoord + "px"
                    });
                }
                
            });
        });
    };
})(jQuery);

// call the plugin
$(function(){
	$('.bg3').parallax({ "coeff":-0.25 });
	$('.bg2').parallax({ "coeff":-0.5 });
	$('.bg1').parallax({ "coeff":-0.75 });
	
	$('.bg3b').parallax({ "coeff":-0.35 });
	$('.bg2b').parallax({ "coeff":-0.8 });
	$('.bg1b').parallax({ "coeff":-0.6 });
});