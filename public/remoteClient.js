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
	function setState(itemField, state){
		itemField.value = state == 1 ? "true" : "false";		

	}
	
	Element.prototype.hasClass = function(className) {
    	return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	};

	[].forEach.call(commands, function(item){

		var id = item.attributes['data-id'].value;
		var togglestate = item.attributes['data-togglestate'];	


		if( togglestate != undefined){
			var messageState = id+''+2;
			socket.emit('send', { message: messageState });
			socket.on("callbackButton", function(data){
				if(data.message.indexOf("received") > -1 ){		

					setState(togglestate, data.state); 
				}
			}); 

		}
		item.onclick = function() {
			// var action = item.attributes['data-command'].value ;


			if(togglestate != undefined){
				var action = togglestate.value == "true" ? 0 : 1 ;	

			}else{
				var action = item.attributes['data-command'].value;

			}

			action = id+''+action;
			//on click send the message
			socket.emit('send', { message: action });

			socket.on("callbackButton", function(data){
				if(data.message.indexOf("received") > -1 ){
					
					item.style.background = confirmationColor;
					setState(togglestate, data.state);		
					setTimeout(function(){resetBackground(item) }, 500);
				}
			}); 
		};

	});


}
