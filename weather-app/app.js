const express = require('express');
const request = require("request");
const path = require('path');
const app = express();
const port = 3000;
app.engine('pug', require('pug').__express);
app.set('views',path.join(__dirname,'views'));
app.set('views engine', 'pug');
app.get('/sendWeatherAPI', (req,res) => {
    var options = {
        'mathod' : 'GET',
        'url' : 'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=347629&apikey=qvHYp5wAGfAIoGSbLdlfuALmd1aEcCQk'
    };
    request(options, function(error,response){
        if(error) throw new Error(error);
        var weather_response = JSON.parse(response.body);
        var weather = weather_response[0].WeatherText;
        console.log(weather_response);
        res.send(weather);
        
        

        });

});
app.get('/', (req, res) => {
    res.render('index', {title: 'Weather App',city: 'San Francisco'});
    
    });
    app.listen(port, () =>{
        console.log('weather app listening at http://localhost:${port}');
    });
