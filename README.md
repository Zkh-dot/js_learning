## js_learning
 ### Here u can find code for labs 6-8  
 
### Launching code
1. Create folder for progect
2. use command ```npm init``` 
3. use commans ```npm i express --save```
4. use command ```npm i telegraf --save```
5. use command ```npm i bitcoinaverage --save```
6. use command ```npm i fs --save```
7. create files "server.js", "bot.js" and copy content from git
8. create folder "public" and there files "client.js", "ndx.html" and copy content from git
9. now in folder vs index.js use command ```node server.js```

#### launching 
to launch project use ```node server.js``` command in folder vs server.js
 

Folder "public" is visible for user. There u can find module "client.js", which is for taking info from "nindex.html", creating requests for server and returning info to html to make it visible to user

List of requests in "client.js" and in  "server.js"

 #### Returns list of custom tikers, made for each client 
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
 
#### Returns current price for tiker 
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
    
    restClient.getTickerDataPerSymbol('global', tiker + 'USD', function(response) {
    
        var  response = Number(JSON.parse(response).last);
        //console.log(response);
        res.send([201, response]);
    });
 ```

#### adds target price for list of prices. Personal for each user
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
  
#### Adds tiker to personal list of tikers
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
app.post('/get_extra', (request, response) => {
    var ti = request.body[1];
    get_extract(name[request.sessionID], ti);
    //console.log(get_extract(name));

    response.send(201);
  });
 ``` 
 #### auth session
 in server:
 ```javascript
 app.post('/auth', (request, response) => {
    name[request.sessionID] = request.body[1];
    console.log(name[request.sessionID]);
    response.redirect('http://localhost:3000/');
  });
```  
in client side auth is in file "authorisation.html"

#### price of some tiker
in server:
```javascript
app.post('/customsale', (request, response) => {
      const tiker = request.body[1];
      console.log(tiker);
      response.send([3, 201]);
    });
```    
in client this shit doesnt work and i have no idea how to fixe it, so i use a ~~butt~~plug

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

## How to start ur own progect:
Here express start: ``` https://expressjs.com/ru/starter/installing.html ```

And here hello world example ``` https://expressjs.com/ru/starter/hello-world.html  ```

## More examples in test branch!

