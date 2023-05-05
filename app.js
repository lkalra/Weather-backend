const { log } = require("console")
const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "https://weatherapi-tmhn.onrender.com")
    // res.send("Hello, World!")
})

app.post("/", function(req, res){
    const query = req.body.cityName
    const apikey = "f8069749eaa4fa93b413109dae74990b"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit 
    https.get(url,function(response){
        // console.log(response);
        // console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data); //gives hexadecimal format
            //json.parse coverts data in object and json.stringyfy coverts object in string
            const weatherData = JSON.parse(data) //gives complete info about asked city
            const temp = weatherData.main.temp  //gives only temp
            const weatherDesc = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
            res.write("<p>the weather is currently "+weatherDesc+"<p>")
            res.write("<h1>temp in " + query + " is "+temp+" degree celcius</h1>")
            res.write("<img src="+imageUrl+">")
            res.send()
        })
    })
})


app.listen(port,function(){
    console.log("Server started "+ port)
})