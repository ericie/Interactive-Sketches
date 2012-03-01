require(['toxic-libs-1', 'DAT.GUI.min', '../actions/actions'], function(){
	console.log("loaded 2");
});

require(["jquery", "jquery.alpha", "jquery.beta"], function($) {
//require(['toxi/geom/Vec2D', toxi/color/TColor], function(Vec2D, TColor){
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
     $(function() {
        $('body').alpha().beta();
        console.log("loaded");
    });
    
});