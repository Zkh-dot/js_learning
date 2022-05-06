console.log('Client-side code running');

const button = document.getElementById('myButton');
 

setInterval(function() {
    fetch('/BTC', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('BTC').innerHTML = `BTC is now ${data[1]}`;
        console.log(data[1]);
      })
      .catch(function(error) {
        console.log(error);
      });

      fetch('/ETH', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('ETH').innerHTML = `ETH is now ${data[1]}`;
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });
      fetch('/LTC', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('LTC').innerHTML = `LTC is now ${data[1]}`;
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });
      
  }, 2000);


button.addEventListener('click', function(e) {
    if(document.getElementById("tg").value != ""){
        if(document.getElementById("BTC").value != undefined){
        
        }
        if(document.getElementById("ETH").value != undefined){
        
        }
        if(document.getElementById("LTC").value != undefined){
        
        }
    }
    else{
        console.log(document.getElementById("tg").value);
    }
});

/*try {
  const response = await fetch('https://example.com/profile/avatar', {
    method: 'PUT',
    body: formData
  });
  const result = await response.json();
  console.log('Успех:', JSON.stringify(result));
} catch (error) {
  console.error('Ошибка:', error);
}*/