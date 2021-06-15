const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { post } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName, lastName, email);
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
                }
            }  
        ]
    };

    const jsondata = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/"; // After lists/ enter list ID.
    const options = {
        method: "POST",
        auth: "naman:" // Enter API After Colon
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})

