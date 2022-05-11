# js_learning
 ### Here u can find code for labs 6-8  

#### launching
```
to launch project use "node server.js" command in folder vs server.js
```

Folder "public" is visible for user. There u can find module "client.js", which is for taking info from "nindex.html", creating requests for server and returning info to html to make it visible to user

List of requests in "client.js" and in  "server.js"
in client:
```javascript
fetch('/custom_tikers', {method: 'GET'})
  .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
```
in server:
```javascript
app.get('/custom_tikers', (req, res) => {
    //res.sendStatus(201);
        //console.log(response);
        res.send([201, get_extract(name[req.sessionID])]);
    });
```
this shit doesnt work and i have no idea how to fixe it, so here is ~~butt~~plug 

 #### Returns list of custom tikers, made for each client 
in client: 
```javascript
fetch('/tiker', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      }) 
``` 
in server:
```javascript
 app.get('/tiker', (req, res) => {
    //res.sendStatus(201);
    
    restClient.getTickerDataPerSymbol('global', 'BTCUSD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        //console.log(response);
        res.send([201, response]);
    });
 ```

#### Returns current price for tiker 
in client:
```javascript
fetch('/tg', {  
          method: 'post',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(targets),
      })
```
in server:
```javascript
app.post('/tg', (request, response) => {
    const tg_id = request.body;
    for(var i in tg_id)
    {
      append(i, tg_id[i], name[request.sessionID]);
    }
    //console.log(request.body);
    response.send(201);
  });
  ```
  
#### Adds target for some of cryptocoins  
in client:
```javascript
fetch('/get_extra', {  
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({1: document.getElementById("tik").value}),
})
```
in server:
```javascript
app.get('/custom_tikers', (req, res) => {
    //res.sendStatus(201);
        //console.log(response);
        res.send([201, get_extract(name[req.sessionID])]);
    });
 ```
#### Adds tiker for list of shown tikers. Personal for each client 

Geleral difference between app.post and app.get is that app.get doesnt put any info to server, we only request thomething from it, while app.post allows us to put some info to server

### Related funcs from bot.js:
```javascript
function isNumber(n){
  return Number(n)=== n;
}
```
extra_tikers - list of personal tikers wich can be added
```javascript
function get_extract(name, tik = ''){
  if(extra_tikers[name] == undefined){
    extra_tikers[name] = [];
  }
  if(tik != ''){
    //console.log(extra_tikers[name]);
    extra_tikers[name].push(tik);
  }
  return(extra_tikers[name]);
}
```
"append" adds tiker and price to expected
```javascript
function append(tiker, price, id)
{
    
    if (ticers[tiker] == undefined){
        ticers[tiker] = {}
    }
    if(isNumber(id))
      ticers[tiker][price] = id;
    else
      if(id in users)
        ticers[tiker][price] = users[id];
}
```
