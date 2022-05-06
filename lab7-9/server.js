console.log('Server-side code running');

const express = require('express');

const app = express();

var a;

/*function check(ticker, res){
    const ba = require('bitcoinaverage');
    var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
    
    gloabl.a = restClient.getTickerDataPerSymbol('global', ticker, function(response) {
    
        var  response = Number(JSON.parse(response).last);
        console.log(response);
    });
}*/

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
    const click = 1;
    console.log(click);
    res.send();
    res.sendStatus(201);
  });

  app.get('/BTC', (req, res) => {
    //res.sendStatus(201);
    const ba = require('bitcoinaverage');
    var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
    
    restClient.getTickerDataPerSymbol('global', 'BTCUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        console.log(response);
        res.send([201, response]);
    });
        
    
  });

  app.get('/ETH', (req, res) => {
    //res.sendStatus(201);
    const ba = require('bitcoinaverage');
    var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
    
    restClient.getTickerDataPerSymbol('global', 'ETHUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        console.log(response);
        res.send([201, response]);
    });
    
  });
  app.get('/LTC', (req, res) => {
    //res.sendStatus(201);
    const ba = require('bitcoinaverage');
    var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
    
    restClient.getTickerDataPerSymbol('global', 'LTCUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        console.log(response);
        res.send([201, response]);
    });
    
  });


//import {launchbot} from "./public/bot.js";
//launchbot();
