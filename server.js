console.log('Server-side code running');

const express = require('express');

const app = express('express');

var name = {};

const ba = require('bitcoinaverage');
var restClient = ba.restfulClient(' ');


var cookieParser = require('cookie-parser');
var session = require('express-session')
app.use(cookieParser());
app.use(session({
    secret: 'ofsbnegower8bnweth4', // just a long random string
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// start the express web server listening on 3000
app.listen(3000, () => {
  console.log('listening on http://localhost:3000/');
});

// serve the homepage
app.get('/', (req, res) => {
  if(name[req.sessionID] == undefined)
  {
    res.sendFile(__dirname + '/public/authorisation.html');
  }
  else{
   res.sendFile(__dirname + '/public/nindex.html');
  }
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

app.get('/custom_tikers', (req, res) => {
    //res.sendStatus(201);
        //console.log(response);
        res.send([201, get_extract(name[req.sessionID])]);
    });
    

app.post('/customsale', (request, response) => {
      const tiker = request.body[1];
      console.log(tiker);
      response.send([3, 201]);
    });

app.post('/get_extra', (request, response) => {
    var ti = request.body[1];
    get_extract(name[request.sessionID], ti);
    //console.log(get_extract(name));

    response.send(201);
  });



app.post('/auth', (request, response) => {
    name[request.sessionID] = request.body[1];
    console.log(name[request.sessionID]);
    response.redirect('http://localhost:3000/');
  });


app.post('/tg', (request, response) => {
    const tg_id = request.body;
    for(var i in tg_id)
    {
      append(i, tg_id[i], name[request.sessionID]);
    }
    //console.log(request.body);
    response.send(201);
  });

const { append, get_extract } = require('./bot.js');
const { launchbot } = require('./bot.js');
const { get } = require('request');
launchbot();
