
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})


const itemSchema = {
    name : String
}

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name : "welcome to the todo list"
});

const item2 = new Item({
    name : "click + button to add in list"
});

const defaultitems = [item1,item2];


// var items = [];

app.get("/", function(req,res){
      
    var today = new Date();

    Item.find({},function(err,founditem){
        if(founditem.length === 0){
             
            Item.insertMany(defaultitems,function(err){
                 if(err){
                       console.log(err);
                     }
                   else{
                       console.log(" item added");
                   }
                 });
                 res.redirect("/");
          }
        else{
            res.render("list",{kindofday : today,newlistitem:founditem});
        }
    });
   
    // var options={
    //    weekday :"long",
    //    day :"numeric",
    //    month:"long"
    // };

    // var day = today.toLocaleDateString("en-US",options);

    // res.render("list",{kindofday : today,newlistitem:items});
})

app.post("/",function(req,res){
 var itemname = req.body.inputitems;
  
   const item = new Item({
    name: itemname
   });

   item.save();

   res.redirect("/");

})

app.post("/delete",function(req,res){
    const checkitemid = req.body.checkbox;

    Item.findByIdAndRemove(checkitemid,function(err){
       if(!err){
        console.log("deleted");
        res.redirect("/");
       }
    })
})

app.listen(3000,function(req,res){
    console.log("server is up");
})