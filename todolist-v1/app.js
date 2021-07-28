const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
var items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res){


    // if(currentDay === 6 || currentDay === 0){
    //     day = "Weekend";   
    // }else{
    //     day = "Weekday";
    // }

    // if(currentDay === 0){
    //     day = "Sunday";
    // }else if(currentDay === 1){
    //     day = "Monday";
    // }else if(currentDay === 2){
    //     day = "Tuesday";
    // }else if(currentDay === 3){
    //     day = "Wednesday";
    // }else if(currentDay === 4){
    //     day = "Thrusday";
    // }else if(currentDay === 5){
    //     day = "Friday";
    // }else if(currentDay === 6){
    //     day = "Saturday";
    // }
    let day = date();
    res.render("list", {listTitle: day, newListItem: items });
});

app.post("/" , function(req,res){
    console.log(req.body);
    var item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", newListItem: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function(){
    console.log("server started on port 3000");
});