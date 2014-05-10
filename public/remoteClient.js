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


	[].forEach.call(commands, function(item){
		
		item.onclick = function() {
			var action = item.attributes['data-command'].value;
			//on click send the message
			socket.emit('send', { message: action });
			socket.on("callbackButton", function(data){
				if(data.message.indexOf("received") > -1 && action == data.operation ){
					
					item.style.background = confirmationColor;
			
					setTimeout(function(){resetBackground(item) }, 500);
				}
			}); 
		};
	});


}
