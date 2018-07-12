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


socket.emit('newMessage',{
  from:'Admin',
  text:'Welcome to the Chat App',
  createdAt:new Date().getTime()
});

socket.broadcast.emit('newMessage',{
  from:'Admin',
  text:'New User joined',
  createdAt:new Date().getTime()
});

socket.on('createMsg',(message)=>{  //This name of event 'createMsg' should be exactly same as the one in the index.js.
//The event names should be exactly same in client and server
console.log('createMessage',message);

io.emit('newMessage',{  //In this case, the message was broadcasted to all including the sender
                            // To avoid that, we used the socket.broadcast.emit below. This method
                            // broadcasts the message to all except the sender.
from:message.from,
text:message.text,
createAt:new Date().getTime()
});

// socket.broadcast.emit('newMessage',{
//   from:message.from,
//   text:message.text,
//   createdAt:new Date().getTime()
// });
});



socket.on('disconnect',()=>{
console.log('User is Disconnected');
});

}); //lets you register an event listener.

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
