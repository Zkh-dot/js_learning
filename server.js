console.log('Server-side code running');

const express = require('express');

const app = express('express');


const ba = require('bitcoinaverage');
var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');

const RealtimeStock = require("pure-realtime-stock");
const realtime = new RealtimeStock();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on http://localhost:8080/');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
    const click = 1;
    console.log(click);
    res.sendStatus(201);
  });

  app.get('/BTC', (req, res) => {
    //res.sendStatus(201);
    
    restClient.getTickerDataPerSymbol('global', 'BTCUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        //console.log(response);
        res.send([201, response]);
    });
        
    
  });

  app.get('/ETH', (req, res) => {
    //res.sendStatus(201);
    
    restClient.getTickerDataPerSymbol('global', 'ETHUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        ////console.log(response);
        res.send([201, response]);
    });
    
  });
  app.get('/LTC', (req, res) => {
    //res.sendStatus(201);
    
    restClient.getTickerDataPerSymbol('global', 'LTCUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        //console.log(response);
        res.send([201, response]);
    });
    
  });

  app.post('/customsale', (request, response) => {
    const tiker = request.body[1];
    console.log(tiker);
    realtime.getPrice(tiker).then(price =>{ 
      console.log(price);
      response.send([201, price])
    });

    
    
  });


app.post('/tg', (request, response) => {
    const tg_id = request.body;
    for(var i in tg_id)
    {
      for(var j in tg_id[i])
      {
        //console.log(tg_id[i][j]);
        append(j, tg_id[i][j], i);
      }
      //console.log(tg_id[i]);
    }
    //console.log(request.body);
    response.send(201);
  });

const { append } = require('./bot.js');
const { launchbot } = require('./bot.js');
const now = require('performance-now');
launchbot();