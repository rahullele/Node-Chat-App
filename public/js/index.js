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

socket.on('newMessage',function(message) {
console.log('New Message', message);

var li=jQuery('<li></li>');
li.text(`${message.from}: ${message.text}`);
jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit',function(e){
e.preventDefault();

socket.emit('createMessage',{
  from:'User',
  text:jQuery('[name=message]').val()
},function(){

});

});
