var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});

console.log('websockets server started');

ws.on('connection', function (socket){
    console.log('client connection established');

    messages.forEach(function (msg){ //send old message to newly connect
       
        if(msg.substring(23,0) == "***Topic is changed to "){
            var temp = "***Topic is " + msg.substring(23);
            msg = temp;
        }

        socket.send(msg);


    });

    socket.on('message', function (data){
        console.log('message received: ' + data);

          //Test to see if there is a command /topic inputted
          if(data.substring(7,0) == "/topic "){
              data = "***Topic is changed to " + data.substring(7);
          }  
        
        messages.push(data);
        ws.clients.forEach(function(clientSocket){
            clientSocket.send(data)
        });
    });
});

var messages = [];

console.log('websockets server started');