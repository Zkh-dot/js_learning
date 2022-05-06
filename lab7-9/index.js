
const http = require('http');
const fs = require('fs');
/*import http from 'http';
import fs from 'fs';
import ba from 'bitcoinaverage';*/

const port = 5555;

function cost(tiker){
  try{  
  const ba = require('bitcoinaverage');
  var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
  restClient.getTickerDataPerSymbol('global', tiker, function(response) {
  response = Number(JSON.parse(response).last);
  return response;
  },
  function(error){
      console.log(error); 
      return -1;
  }); 
} 
  catch (e){
    return e;
  } 
};

var ticers = {}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const { method, url } = req;
  console.log(method, url);
  switch (method) {
    case 'GET':
      if (url === '/') {
        try {
          const data = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
          res.write(data);
        } catch (error) {
          console.log(error);
          return;
        }
      } else if (url === '/info') {
        const objToJson = {
          data: 'Server was created like example of native nodejs server',
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(objToJson));
        res.end();
      } else {
        const data = fs.readFileSync(`${__dirname}${url}`, 'utf8');
        res.write(data);
        res.end();
      }
      break;
    case 'POST':
      break;
    case 'PUT':
      break;

    default:
      res.write(`Unknown method: ${method}`);

      break;
  }
  res.end();
});

server.on('listening', () => {
  console.log(`Server starting on: http://localhost:${port}`);
});

function check(){
  console.log("Работает");
  alert(cost("BTC"));
};

server.listen(port);
