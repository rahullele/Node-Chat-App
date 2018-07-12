const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

//console.log(__dirname+'../public'); //This goes inside the server folder, then comes out and then goes into public folder
const publicPath=path.join(__dirname,'../public'); //This goes directly into the public folder
const port=process.env.PORT || 3000;
var app=express();

//Behind the scenes, express uses a built-in module called 'http'.
//We configure express to work with http, so that we can use socket.io

var server=http.createServer(app);
var io=socketIO(server); //In io, we get the web sockets server, we can use it for emitting or listening to events.

//To serve static files such as images, CSS files, and JavaScript files,
//use the express.static built-in middleware function in Express.
// The function signature is:
//
// express.static(root, [options])
// The root argument specifies the root directory from which to serve static assets.
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('New user connected');

socket.emit('newMsg',{
  from:'mike',
  text:'Hey. What is going on?',
  createAt:123
});

socket.on('createMsg',(newMsg)=>{  //This name of event 'createMsg' should be exactly same as the one in the index.js.
//The event names should be exactly same in client and server
console.log('createMessage',newMsg);
});

socket.on('disconnect',()=>{
console.log('User is Disconnected');
});

}); //lets you register an event listener.

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
