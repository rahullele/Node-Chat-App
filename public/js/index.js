var socket = io(); //Here the client is requesting the server to open a web socket and keep that connection open.
      //The above loaded library 'socket.io.js' is a web socket library for the client side.
socket.on('connect',function() {
console.log('Connected to Server'); //Arrow functions don't work on certain browsers like
});                                //some versions of safari and firefox
                                    //so we use regular functions on client side
                                    //but we can use arrow functions on server side


socket.on('disconnect',function() {
console.log('Disconnected from server');
});

socket.on('newMessage',function(msg) {
console.log('New Message', msg);
});
