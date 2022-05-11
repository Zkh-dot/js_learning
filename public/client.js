
const button = document.getElementById('myButton');
const tbutton = document.getElementById('tikerbutton');
 
var my_div = newDiv = null;

function addElement(id, text) {

  // Создаём новый элемент div
  // и добавляем в него немного контента

  var newDiv = document.createElement("div");
      newDiv.innerHTML = '<b><p align="center" id="' + id + '">' + text + '</p></b>';

  // Добавляем только что созданный элемент в дерево DOM

  my_div = document.getElementById("HRP");
  document.body.insertBefore(newDiv, my_div);
}

setInterval(function() {
  fetch('/custom_tikers', {method: 'GET'})
  .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
  .then(function(data) {
    tikers = data[1];
    if(tikers != [])
    {
      for(i in tikers){
        /*fetch('/customsale', {  
          method: 'post',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(tikers[i]),
        })
        .then(function(response) {
          if(response.ok) alert('Ваши тикеры записаны');
        })
        .then(function(data) {*/
          var element=document.getElementById(tikers[i] + 'tiker');
          if(!element){
            addElement(tikers[i] + 'tiker', tikers[i] + ' is now loading')
          }

          else{
            document.getElementById(i + 'tiker').innerHTML = `${tikers} is now ${2}`;
          }
        //})
      }
    }
  })

    fetch('/BTC', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('BTC').innerHTML = `BTC is now ${data[1]}`;
        //console.log(data[1]);
      })
      .catch(function(error) {
        //console.log(error);
      });

      fetch('/ETH', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('ETH').innerHTML = `ETH is now ${data[1]}`;
        //console.log(data);
      })
      .catch(function(error) {
        //console.log(error);
      });
      fetch('/LTC', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('LTC').innerHTML = `LTC is now ${data[1]}`;
        //console.log(data);
      })
      .catch(function(error) {
        //console.log(error);
      });
      
  }, 2000);

tbutton.addEventListener('click', function(e) {
  console.log(1);
  fetch('/get_extra', {  
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({1: document.getElementById("tik").value}),
})
  .then(function(response) {
    if(response.ok) alert('Ваши тикеры записаны');
  })
})

button.addEventListener('click', function(e) {
  //tgid = document.getElementById("tg").value;
  BTC_target= document.getElementById("iBTC").value;
  ETH_target = document.getElementById("iETH").value;
  LTC_target = document.getElementById("iLTC").value;
  var targets = {};
         
    
        if(BTC_target != ''){
          targets['BTCUSD'] = BTC_target;
        }
        if(ETH_target != ''){
          targets['ETHUSD'] = ETH_target;
        }
        if(LTC_target != ''){
          targets['LTCUSD'] = LTC_target;
        }
        fetch('/tg', {  
          method: 'post',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(targets),
      })
      .then(function(response) {
        if(response.ok) alert('Ваши таргеты записаны');
      })
        
    
    
});
