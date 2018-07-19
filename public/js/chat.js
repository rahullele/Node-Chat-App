
var socket = io(); //Here the client is requesting the server to open a web socket and keep that connection open.
      //The above loaded library 'socket.io.js' is a web socket library for the client side.


function scrollToBottom()
{

//Selectors
var messages=jQuery('#messages');
var newMessage=messages.children('li:last-child');
//Heights
var clientHeight=messages.prop('clientHeight');
var scrollTop=messages.prop('scrollTop');
var scrollHeight=messages.prop('scrollHeight');
var newMessageHeight=newMessage.innerHeight();
var lastMessageHeight=newMessage.prev().innerHeight();

if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
  messages.scrollTop(scrollHeight);
}
}

socket.on('connect',function() {
var params=jQuery.deparam(window.location.search);

socket.emit('join',params,function(err){
if(err){
  alert(err);
window.location.href='/'
}else{
console.log('No error');
}

});                                   //Arrow functions don't work on certain browsers like
});                                //some versions of safari and firefox
                                    //so we use regular functions on client side
                                    //but we can use arrow functions on server side


socket.on('disconnect',function() {
console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
var ol=jQuery('<ol></ol>');

users.forEach(function(user){
ol.append(jQuery('<li></li>').text(user));
});
jQuery('#users').html(ol); //We don't want to append to the list but print it as a new list.
});

socket.on('newMessage',function(message) {
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html(); //returns the html ie paragraph tag under id:message-template
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime,
    timeStamp:moment(message.createdAt).fromNow()
  });

  jQuery('#messages').append(html);
// var formattedTime=moment(message.createdAt).format('h:mm a');
// console.log('New Message', message);
//
// var li=jQuery('<li></li>');
// li.text(`${message.from} ${formattedTime}: ${message.text}`);
// jQuery('#messages').append(li);
scrollToBottom();
});

function updateTimeStamps(){
  let loop = document.getElementById("messages").getElementsByClassName("messages").length;
  for(let i=0; i<loop; i++){
    let timeStamp = document.getElementById("messages").getElementsByClassName("messages")[i].getAttribute("data-timestamp");
    document.getElementById("messages").getElementsByClassName("messages")[i].getElementsByClassName("timestamps")[0].textContent = moment(timeStamp).fromNow();
  }
  console.log('TimeStamps updated');
};

setInterval(updateTimeStamps, 60000);

socket.on('newLocationMessage',function(message){
var formattedTime=moment(message.createdAt).format('h:mm a');

var template=jQuery('#location-message-template').html(); //returns the html ie paragraph tag under id:message-template
var html=Mustache.render(template,{
  url:message.url,
  from:message.from,
  createdAt:formattedTime,
  timeStamp:moment(message.createdAt).fromNow()
  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My Current Location</a>');
  //
  // li.text(`${message.from} ${formattedTime1}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});
jQuery('#messages').append(html);
scrollToBottom();
});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();  //The default behaviour is that everytime we submit, it refreshes the entire page, this is the
//default behaviour, to avoid that we write e.preventDefault. Now even if we click submit, it won't refresh the entire
//page but just give the result on submit

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
