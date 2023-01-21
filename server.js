const express = require('express')
const bodyParser = require('body-parser');
const request = require("request");
const app = express()
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//temple engine
app.set('view engine', 'ejs')


//rutas
app.get('/', function (req, res) {
  res.render('index', {weather:null, error:null})
});


app.post('/', function (req, res) {
    res.render('index');
    const city = req.body.city;
    const apiKey = "538659e0389fc7143f8b6e82543811d6";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request (url, (err,response, body)=> {
        if (err) {
            res.render("index", {weather: null, error: "Error, please try again"});
        } else {
            let weather = JSON.parse(body)
            if(weather.main==undefined){
                res.render("index", {weather:null, error:"Error, please try again"});
            } else {
                let weather = `Hay ${weather.main.temp} grados en ${weather.name}!`;
                res.render("index", {weather:weatherText, error:null});
            }
        }
    })
  })

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})