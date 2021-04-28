const express = require("express"); // reuire module
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "016a23408b69db90cc7a52019bd05119";
  const unit = "metric";
  const  url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +""


  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      res.send("<h1>The temperature in "+query+" is "+ temp +" degree Celcius.</h1>");
      //console.log(weatherData);
    })
  })
})



app.listen(3000,function(){
  console.log("server is running on port 3000")
})
