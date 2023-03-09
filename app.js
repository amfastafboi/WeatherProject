const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
var port = 3000

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname +'/index.html')

})

app.post('/', function(req, res){
    const city = req.body.cityName;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=1f46d7eb463996b15f6cc999f37f6c59&units=metric';
    https.get(url, function(response){

        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            
            const icon = weatherData.
            weather[0].icon;
            
            const iconUrl = 'http://openweathermap.org/img/wn/'+ icon + '@2x.png';

            res.set("Content-Type", "text/html")
            
            res.write('<h1>The Temperature in ' + city + ' is: ' + temp + ' degree Celcius.' + ' And there is ' + des + '.</h1>')

            res.write('<img src='+ iconUrl + '>')
            
            res.send();
        }) 
    })
})


app.listen(port, function(){
    console.log('The server has started')
})