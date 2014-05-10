#Raspberry Remote 
This node.js application create a web interface to send messages to your Arduino, 
connected using **nrf24l01+** modules to your Raspberry

## How it works

When a button with class `.command` is pressed, the application read the 
`data-command` attribute value of the pressed button and send this message to the 
Raspberry. Here tha application will call, with the exec function, the `../remote -m message` command.
The `remote` application then communicate send the message to the arduino using the nrf24l01+ module.

To be able to use the Raspberry's GPIO the application must be starte with roots privileges.

## Needed Folders/Files

To make this application works you need the `views` folder and the `routes.js` file
Both of them must be placed on the parent directory of the application. 

The layout templating is realized using [express3-handlebars](https://github.com/ericf/express3-handlebars), so if you have any doubt on how to implement it have a look at its repository.

![alt text](https://raw.githubusercontent.com/edoardoo/RemoteRaspberry/screenshot/pathStructure.png "Path Folders Structure")
