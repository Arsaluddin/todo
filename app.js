
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var items = [];

app.get("/", function(req,res){
      
    var today = new Date();
   
    var options={
       weekday :"long",
       day :"numeric",
       month:"long"
    };

    var day = today.toLocaleDateString("en-US",options);

    res.render("list",{kindofday : day,newlistitem:items});
})

app.post("/",function(req,res){
 var item = req.body.inputitems;
  items.push(item);
  res.redirect("/");

})

app.listen(3000,function(req,res){
    console.log("server is up");
})