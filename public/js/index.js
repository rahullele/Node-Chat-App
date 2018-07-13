
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
var formattedTime=moment(message.createdAt).format('h:mm a');
console.log('New Message', message);

var li=jQuery('<li></li>');
li.text(`${message.from} ${formattedTime}: ${message.text}`);
jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
var formattedTime1=moment(message.createdAt).format('h:mm a');

  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} ${formattedTime1}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();

var messageTextbox=jQuery('[name=message]');

socket.emit('createMessage',{
  from:'User',
  text:messageTextbox.val()
},function(){
  messageTextbox.val('');
});

});

var locationButton=jQuery('#send-location');
locationButton.on('click', function(){ //Here, we can also write jQuery('#send-location').on('click'...) , but it is better to write
                                        //the way it is written now because the first approach takes more time as jQuery
                                        //again searches for id:send-location
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }
locationButton.attr('disabled','disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled','disabled').text('Send location');
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  })
  },function(){
    locationButton.removeAttr('disabled','disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
