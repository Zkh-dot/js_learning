const { Telegraf } = require("telegraf");
const fs = require('fs');
const { token } = require('./token.js');

var users = {};

var test = {};

var timer = {};
 
var protocol = {};

var photos = {}

function isNumber(n){
  return Number(n)=== n;
}

// Создать бота с полученным ключом
const bot = new Telegraf(token());

bot.help((ctx =>
  {
    ctx.reply(
`Привет! Я бот для помощи админам телеграм - каналов. 
Ты можешь выставить свой канал при помощи команды /start [имя канала] 
При помощи команды /fight я перейду в боевой режим 
При помощи команды /test можно вернутся в тестовый режим 
      
Я буду пересылать все фото, которые ты мне скинешь в твой канал. 
Ты можешь выставить таймер при помощи команды /timer + [минуты], тогда я буду отправлять полученные от тебя фото раз в установленное кол-во минут, делая постингв твоем канале более регулярным 
При помощи команды /go можно запустить отправку загруженных тобой фото в твой канал с установленным таймером
По вопросам связанным с ботом можно обращаться к @Lunitary \n
p.s. И да, я умею в авторизацию и больше чем одного пользователя :з
`)
}))

// Обработчик начала диалога с ботом
bot.start((ctx) =>
  {
    users[ctx.chat.id] = ctx.message.text.split(' ')[1];
    test[ctx.chat.id] = 1;
    protocol[ctx.chat.id] = 1;
    timer[ctx.chat.id] = 10;
    ctx.reply(
    `Приветствую, ${
       ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Я запомнил твой канал. Убедись, что у меня там есть права на постинг, запусти команду /fight и я начну работать в боевом режиме.`
  )
  }
);

bot.command("fight", async (ctx) => {
  var userid = ctx.chat.id;
    ctx.telegram.sendMessage(users[userid], 'test').catch(err => {
      delete users[userid];
      ctx.telegram.sendMessage(userid, 'Используйте команду /start еще раз, я не смог написать в ваш телеграм канал');  
      console.log(users);
      return 0;
    })
    ctx.telegram.sendMessage(userid, 'Перевел вас в боевой режим. Теперь сообщения отправляются в ваш канал.');
    test[userid] = 0;
})

bot.command("test", async (ctx) => 
  {
    ctx.telegram.sendMessage(userid, 'Перевел вас обратно в тестовый режим. Ваш канал сброшен.');  
    delete users[userid];
    test[ctx.chat.id] = 1;
  }
)

bot.command("stat", async(ctx) =>{
  fetch(`https://api.telegram.org/bot${token()}/getChatMembersCount?chat_id=${ctx.message.text.split(' ')[1]}`)
  .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
  .then(function(data) {
    ctx.reply(`Количество подписчиков в канале ${ctx.message.text.split(' ')[1]} = ${data["result"]}`);
  })

})

bot.command("timer", async (ctx) => 
  {
    var userid = ctx.chat.id;
    var time = ctx.message.text.split(' ')[1];
    try
    {
      time = parseInt(time);
      if(time == NaN){    //этот if не работает по неочевидным причинам
        ctx.telegram.sendMessage(userid, `Вы не ввели число`);
      }
      else
      {
        ctx.telegram.sendMessage(userid, `${time} минут(ы) взято за таймер между постами, спасибо.`); 
        timer[ctx.chat.id] = time * 60000;
      }
    }
    catch (e){
      ctx.telegram.sendMessage(userid, `Попробуйте еще раз, ${e}`);
    }
  }
)


//вот тут url - это ссылка на скачивание
/*bot.on('photo', ctx => {
  const files = ctx.update.message.photo;
  fileId = files[1].file_id
  ctx.telegram.getFileLink(fileId).then(url => {
 
  })
});*/

bot.command("go", async(ctx) =>
{
  ctx.reply("начал отправлять фото в ваш канал");
  try{
  setInterval(function() {
    
      for(i in Object.keys(photos)){
        key = Object.keys(photos)[i];
        //console.log(photos[i]);
        if(photos[key][0] != undefined)
        {
            let photo = photos[key][0];
            photos[key].splice(0, 1);
            ctx.telegram.sendPhoto(key, photo[0], {'caption': ctx.message.caption});
        }
        //console.log(key, 'in', photos);
    }
   
    
    }, timer[ctx.chat.id]);}
    catch(e){
      ctx.reply("Ошибка:", e);
      return(e);
    }
    
})


bot.on('photo', (ctx) => {
  let file = ctx.message.photo.length - 1;
  //console.log(ctx.message.photo[file].file_id);
  var toid = users[ctx.chat.id];
  if(test[ctx.chat.id] == 1 || toid == undefined){
    toid = ctx.chat.id;
  }
  if(photos[toid] == undefined){
    photos[toid] = [];
  }
  console.log(toid);
  photos[toid].push([ctx.message.photo[file].file_id, {'caption': ctx.message.caption}, ctx.chat.id, ctx.telegram]);
  ctx.reply('Фото получено');
  //console.log(photos[toid][0]);
  /*ctx.telegram.sendPhoto(
      toid,
      ctx.message.photo[file].file_id,
      {
          'caption': ctx.message.caption
      }
  );*/
});


// Обработчик простого текста
bot.on("text", (ctx) => {
  return ctx.reply(ctx.message.text);
});

// Запуск бота
bot.launch();