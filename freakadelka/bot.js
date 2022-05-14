const { Telegraf } = require("telegraf");
const needle = require('needle');
const fs = require('fs');

var users = {};

var test = {};
 

// Создать бота с полученным ключом
const bot = new Telegraf("1059442764:AAFlPFEROwxIGxPIK8mgEmO-pusoG77docg");

// Обработчик начала диалога с ботом
bot.start((ctx) =>
  {
    users[ctx.chat.id] = ctx.message.text.split(' ')[1];
    test[ctx.chat.id] = 1;
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

// Обработчик команды /help
bot.help((ctx) => ctx.replyWithPhoto(''));

//вот тут url - это ссылка на скачивание
/*bot.on('photo', ctx => {
  const files = ctx.update.message.photo;
  fileId = files[1].file_id
  ctx.telegram.getFileLink(fileId).then(url => {
 
  })

});*/

bot.on('photo', (ctx) => {
  let file = ctx.message.photo.length - 1;
  //console.log(ctx.message.photo[file].file_id);
  var toid = users[ctx.chat.id];
  if(test[ctx.chat.id] == 1 || toid == undefined){
    toid = ctx.chat.id;
  }
  console.log(toid);
  ctx.telegram.sendPhoto(
      toid,
      ctx.message.photo[file].file_id,
      {
          'caption': ctx.message.caption
      }
  );
});


// Обработчик простого текста
bot.on("text", (ctx) => {
  return ctx.reply(ctx.message.text);
});

// Запуск бота
bot.launch();