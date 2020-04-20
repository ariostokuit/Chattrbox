var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
const mime = require('mime');

var handleError = function (err, res){ 
    res.writeHead(404);
    res.end();
}

function goToError(){
    window.location.replace('app/error.html');
}

var server = http.createServer(function(req, res){
    console.log('Responding to a request.');

    var filePath = extract(req.url);

    //Test if file exist, if not then display a custom Error page 
    if(!fs.existsSync(filePath)){
        filePath = 'app/error.html';
    }
    

    fs.readFile(filePath, function (err, data){
        if(err){
            handleError(err, res);
            goToError();
        }
        else{
            if(mime.getType(filePath) == 'text/html'){
                res.setHeader('Content-Type', 'text/html');
            } 
            else if(mime.getType(filePath) == 'application/pdf'){
                res.setHeader('Content-Type', 'application/pdf');
            }
            else if(mime.getType(filePath) == 'image/jpeg'){
                res.setHeader('Content-Type', 'image/jpeg')
            }
            else if(mime.getType(filePath) == 'image/gif'){
                res.setHeader('Content-Type', 'image/gif');
            }
        res.end(data);
        }
    });
});
server.listen(3000);