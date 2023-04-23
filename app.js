const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const express = require("express");
const app = express();
const port = 3000;



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", function(req, res){

    let currentDay = date.dayOfTheWeek();
    res.render("list", {listTitle: currentDay, items: items});
});

app.post("/", function(req, res){
    console.log(req.body.list);
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", items: workItems})
});

app.post("/work", function(req, res){
    workItems.push(req.body.newItem);
        res.redirect("/work");

    
});


app.listen(port, function(){
    console.log("Server is listening");
});

function dayOfTheWeek () {

    today = new Date();
    options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }

    let currentDay = (today.toLocaleDateString('en-US', options));
    return currentDay;
};
