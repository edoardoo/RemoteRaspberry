var animations = [];
var selector = ".gravatar";

function LoadingAnimation(e) {
	var self = this;

	this.running = false;
	this.position = 0;
	this.element = e;
	this.circleCanvas ='';
	this.ctx = '';
	this.message = false;
	this.canvasDimensions = {
		height: 0,
		width: 0,
		r: 0,
		origin: 0,
		circleWidth: 0
	}

	this.bootstrap = function(e){

		self.canvasDimensions.circleWidth = $(e).width();
		self.canvasDimensions.height = self.canvasDimensions.circleWidth;
		self.canvasDimensions.width = self.canvasDimensions.circleWidth;
		self.canvasDimensions.r = self.canvasDimensions.circleWidth/2;
		self.canvasDimensions.origin = self.canvasDimensions.circleWidth/2;
		self.circleCanvas = $(e).find(".circleCanvas");
		self.ctx = $(self.circleCanvas)[0].getContext('2d');
		$(self.circleCanvas)[0].height = self.canvasDimensions.height;
		$(self.circleCanvas)[0].width = self.canvasDimensions.width;

	}
	this.bootstrap(this.element);
	this.animate = function( duration, easing ){

		var start = Date.now();
		var shortCircle = 1;
		var loopState = 0;
		(function loop () {
			if(self.running){
					var p = ((Date.now()-start)/duration) % 1;
				if( p < loopState){
					shortCircle = (shortCircle + 1) %2;
					start = Date.now();
				}
				// console.log(Date.now()-start);
				loopState = p;
				// if p < di p precedente allora ho fatto un giro.
				
				
				//fix to make it not flicker at beginning
				p = (p<0.005)? 0.006 : p;

				shortCircle = shortCircle;
				requestAnimationFrame(loop);
				// render(element, easing(1-p), shortCircle);
				drawCircle( self , easing(p), shortCircle);
				// drawCircle(easing(p), shortCircle);



			}
			
			
		}());
	}

	this.toggleLoading = function(e){

		self.running = !self.running;

		if(self.running){
			self.circleCanvas.css({'transform':'scale(1)'});

			self.animate( 2000, BezierEasing(0.42, 0.0, 0.58, 1.0));

		}else{
			// svgContainer.css({'transform':'scale(0.5)'});
			self.circleCanvas.css({'transform':'scale(0.5)'});
		}	

	}
	this.turnOff = function(e){
		self.running = false;
		self.circleCanvas.css({'transform':'scale(0.5)'});
	}
	this.turnOn = function(e){
		self.running = true;
		self.circleCanvas.css({'transform':'scale(1)'});
		self.animate( 2000, BezierEasing(0.42, 0.0, 0.58, 1.0));
	}
	this.toggleMessage = function( color ){

		var messageCircle = $(self.element).find('.message');
		messageCircle.css({"background-color": color});
		
		messageCircle.css({'transform':'scale(1)'});

		setTimeout(function(){
			
			messageCircle.css({'transform':'scale(.85)'});

		}, 700, messageCircle);

		self.message = !self.message;
	}

}
function drawCircle(e, p, counterClock){

	var ctxLocal = e.ctx;

	counterClockwise = false;
	ctxLocal.clearRect(0, 0, e.canvasDimensions.width, e.canvasDimensions.height);
	ctxLocal.beginPath();
	var rotation = -Math.PI/2
	var startAngle = 0+rotation;
	var endAngle = p*2*Math.PI +rotation;

	if(counterClock == 0){
		var tmp = startAngle;
		startAngle = endAngle;
		endAngle = tmp;
	}

	ctxLocal.arc(e.canvasDimensions.origin, e.canvasDimensions.origin ,
	 e.canvasDimensions.r-5 , startAngle ,endAngle, false);
	ctxLocal.lineWidth = 10;

	// line color
	ctxLocal.strokeStyle = '#fff';
	ctxLocal.stroke();
	ctxLocal.closePath();


}


function loadingAnimationBootstrap(){
	$('.gravatar').each(function(i){
		$(this).attr('id', 'la_'+i);
		animations['la_'+i] = new LoadingAnimation($(this));
	});
}


