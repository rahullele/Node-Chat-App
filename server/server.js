const path=require('path');
const express=require('express');


//console.log(__dirname+'../public'); //This goes inside the server folder, then comes out and then goes into public folder
const publicPath=path.join(__dirname,'../public'); //This goes directly into the public folder
const port=process.env.PORT || 3000;
var app=express();

//To serve static files such as images, CSS files, and JavaScript files,
//use the express.static built-in middleware function in Express.
// The function signature is:
//
// express.static(root, [options])
// The root argument specifies the root directory from which to serve static assets.
app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
