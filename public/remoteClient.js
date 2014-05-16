window.onload = function() {
	//onload this function will initialize a connection and privide communication between server and client
 
	var messages = [];
	//connect to the server (document.domain is necessary to reach the server if the address is different from localhost)
	var socket = io.connect(document.domain);

	//get the buttons id

	var commands = document.getElementsByClassName("command");
	var confirmationColor = "#8BCE9D";

	function resetBackground(element){

			element.style.background = "";
	}
	
	Element.prototype.hasClass = function(className) {
    	return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	};

	[].forEach.call(commands, function(item){
		
		item.onclick = function() {
			var action = item.attributes['data-command'].value ;

			var toggleEnabled = item.hasClass('toggle');
			//on click send the message
			socket.emit('send', { message: action });
			
			socket.on("callbackButton", function(data){
				if(data.message.indexOf("received") > -1 && action == data.operation ){
					
					item.style.background = confirmationColor;

					if(toggleEnabled){
						var toggleValue = item.attributes['data-toggled'].value == 'true';
						toggleValue = !toggleValue;
						item.attributes['data-toggled'].value = toggleValue;
					}

					var state = data.message.split('Got response ')[1].split(',')[0];
					item.attributes['data-state'].value = state;
					
					setTimeout(function(){resetBackground(item) }, 500);
				}
			}); 
		};

		if (item.hasClass('toggle')){
			// socket.emit('send', { message: action });
		}
	});


}
