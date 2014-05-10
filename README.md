#Raspberry Remote 
This node.js application create a web interface to send messages to your Arduino, 
connected using nrf24l01+ modules to your Raspberry

## How it works

When a button with class `.command` is pressed, the application read the 
`data-command` attribute value of the pressed button and send this message to the 
Raspberry. Here tha application will call, with the exec function, the `../remote -m message`