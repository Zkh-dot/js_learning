//console.log('Client-side code running');

const button = document.getElementById('myButton');
const tbutton = document.getElementById('tikerbutton');
 
document.body.onload = addElement;
var my_div = newDiv = null;

function addElement() {

  // Создаём новый элемент div
  // и добавляем в него немного контента

  var newDiv = document.createElement("div");
      newDiv.innerHTML = '<p align="center" id="new">Привет</p>';

  // Добавляем только что созданный элемент в дерево DOM

  my_div = document.getElementById("HRP");
  document.body.insertBefore(newDiv, my_div);
}

setInterval(function() {
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
  fetch('/customsale', {  
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({1: document.getElementById("tik").value}),
})
  .then(function(response) {
    if(response.ok) alert('Ваши тикеры записаны');
  })
})

button.addEventListener('click', function(e) {
  tgid = document.getElementById("tg").value;
  BTC_target= document.getElementById("iBTC").value;
  ETH_target = document.getElementById("iETH").value;
  LTC_target = document.getElementById("iLTC").value;
  var targets = {};
    if(tgid != ""){
        if (targets[tgid] == undefined){
          targets[tgid] = {}
         }
    
        if(BTC_target != ''){
          targets[tgid]['BTCUSD'] = BTC_target;
        }
        if(ETH_target != ''){
          targets[tgid]['ETHUSD'] = ETH_target;
        }
        if(LTC_target != ''){
          targets[tgid]['LTCUSD'] = LTC_target;
        }
        fetch('/tg', {  
          method: 'post',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(targets),
      })
      .then(function(response) {
        if(response.ok) alert('Ваши таргеты записаны');
      })
        
    }
    else{
        ////console.log(document.getElementById("tg").value);
    }
});

/*try {
  const response = await fetch('https://example.com/profile/avatar', {
    method: 'PUT',
    body: formData
  });
  const result = await response.json();
  //console.log('Успех:', JSON.stringify(result));
} catch (error) {
  console.error('Ошибка:', error);
}*/