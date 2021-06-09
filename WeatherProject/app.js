const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended :true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

    // res.send("server is running");
})

app.post("/", function(req,res){
    //console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = ; // Enter Your Weather API Key
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" +apiKey+ "&q=" + query + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherDescription);
            res.write("<p> The Weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The Temperature in " +query+ " is " + temp + " Degree Celcius</h1>");
            res.write("<img src = " + imageUrl + ">");
            res.send();
        });

    })
})

app.listen(3000, function(){
    console.log('server is running on port 3000');
})


