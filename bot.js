const { Telegraf } = require("telegraf");

// Создать бота с полученным ключом
const bot = new Telegraf("1281706952:AAE7mGz4yekYYsqNlKLs3D4mtdg9MBIPxek");

var ticers = {}

var users = {}

function isNumber(n){
  return Number(n)=== n;
}

async function check( )
{
  const ba = require('bitcoinaverage');
  var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
  for(var tiker in ticers)
  {    
    console.log(tiker);
    
    
    
        for (var price in ticers[tiker])
        {
          restClient.getTickerDataPerSymbol('global', tiker, function(response) {
          response = Number(JSON.parse(response).last);
          //console.log(ticers[tiker][price]); 
          if(Math.floor(response / 100) == Math.floor(price / 100))
          {
            bot.telegram.sendMessage(ticers[tiker][price], tiker + ' достиг цели в ' + response.toString( ) + 'долларова');
            delete ticers[tiker][price]; 
            delete ticers[tiker];      
          }
          },
          function(error){
              console.log(error); 
          });
        }
        
    
     
 
}

}

// Обработчик начала диалога с ботом
bot.start((ctx) =>
{
  ctx.reply(
    `Приветствую, ${
       ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Я тебя запомнил, теперь можешь входить через сайт.`
  )
  users[ctx.message.chat.username] =  ctx.message.chat.id;
});

// Обработчик команды /help
bot.help((ctx) => ctx.reply("Справка в процессе"));

// Обработчик команды /whoami
bot.command("whoami", (ctx) => {
  const { id, username, first_name, last_name } = ctx.from;
   
  return ctx.replyWithMarkdown(`Кто ты в телеграмме:
*id* : ${id}
*username* : ${username}
*Имя* : ${first_name}
*Фамилия* : ${last_name}
*chatId* : ${ctx.chat.id}`);
});
 



bot.command("price", (ctx) => {
  const ba = require('bitcoinaverage');
  var tiker = ctx.message.text.split(' ')[1] + 'USD'; 
  //console.log(tiker);
  var restClient = ba.restfulClient('MDczYmVmNzEwNDE3NDVhZjgzMGY2NDIzZjViMGZjNzg');
  
  restClient.getTickerDataPerSymbol('global', tiker, function(response) {
      
      //console.log(response);
      response = JSON.parse(response);
      return ctx.replyWithMarkdown(`Информация по тикеру:
      *Last price* : ${response.last}
      *Highest price* : ${response.high}`)
  }, function(error){
      console.log(error);
  } ) ;
}  );
  
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
  
bot.command("target", (ctx) => {  
  var tiker = ctx.message.text.split(' ')[1] + 'USD';
  var t_price = Number(ctx.message.text.split(' ')[2]);
  append(tiker, t_price, ctx.message.chat.id);
  console.log(ctx.message.chat.id);
  
});

// Обработчик простого текста
bot.on("text", (ctx) => {
  return ctx.reply(ctx.message.text);
});

// Запуск бота
function launchbot(){
    bot.launch();
    let timerId = setInterval(check, 2000);
}

module.exports = {
  append,
  launchbot,
};