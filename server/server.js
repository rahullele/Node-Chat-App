const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const {Users}=require('./utils/users');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
//console.log(__dirname+'../public'); //This goes inside the server folder, then comes out and then goes into public folder
const publicPath=path.join(__dirname,'../public'); //This goes directly into the public folder
const port=process.env.PORT || 3000;
var app=express();

//Behind the scenes, express uses a built-in module called 'http'.
//We configure express to work with http, so that we can use socket.io

var server=http.createServer(app);
var io=socketIO(server); //In io, we get the web sockets server, we can use it for emitting or listening to events.
var users=new Users();
//To serve static files such as images, CSS files, and JavaScript files,
//use the express.static built-in middleware function in Express.
// The function signature is:
//
// express.static(root, [options])
// The root argument specifies the root directory from which to serve static assets.
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log('New user connected');

socket.on('join',(params,callback)=>{

if(!isRealString(params.name) || !isRealString(params.room))
{
return callback('Name and room name are required.');
}

socket.join(params.room);
users.removeUser(socket.id); //to remove the user from any potential previous room
users.addUser(socket.id,params.name,params.room);

io.to(params.room).emit('updateUserList',users.getUserList(params.room));
socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

callback();
});

socket.on('createMessage',(message,callback)=>{  //This name of event 'createMsg' should be exactly same as the one in the index.js.
//The event names should be exactly same in client and server

var user=users.getUser(socket.id);

if(user && isRealString(message.text)){
io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));  //In this case, the message was broadcasted to all including the sender
}

callback();                            // To avoid that, we used the socket.broadcast.emit below. This method
                            // broadcasts the message to all except the sender.
// from:message.from,
// text:message.text,
// createAt:new Date().getTime()
//});

// socket.broadcast.emit('newMessage',{
//   from:message.from,
//   text:message.text,
//   createdAt:new Date().getTime()
// });
});

socket.on('createLocationMessage',(coords)=>{
var user=users.getUser(socket.id);
if(user){
io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,`${coords.latitude},${coords.longitude}`));
}
});


socket.on('disconnect',()=>{
var user=users.removeUser(socket.id);

if(user){
  io.to(user.room).emit('updateUserList',users.getUserList(user.room));
  io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`))
}
});

}); //lets you register an event listener.

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
