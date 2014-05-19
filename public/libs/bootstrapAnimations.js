
function bootstrap(){
	
	var full = $(".full");
	containerWidth = full.width();
	containerHeight = full.height();
}

$(document).ready(function(){
	 
	bootstrap();
	loadingAnimationBootstrap();
	
});

$( window ).resize(function() {
	
		bootstrap();

});
