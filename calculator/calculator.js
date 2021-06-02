const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/",function(request, response){
    var num1 = Number(request.body.num1);
    // console.log(num1);
    var num2 = Number(request.body.num2);

    var result = num1 + num2;
    response.send("The Result of calculation is " + result);
});

app.get("/bmicalculator", function(request, response){
    response.sendFile(__dirname + "/BMICalculator.html");
});

app.post("/bmicalculator",function(request, response){
    var weight = parseFloat(request.body.Weight);
    // console.log(num1);
    var height = parseFloat(request.body.Height);

    var bmi = weight / (height * height);
    response.send("BMI IS " + bmi);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});