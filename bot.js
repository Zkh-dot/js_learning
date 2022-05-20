const { Telegraf } = require("telegraf");
const fs = require('fs');
const { token } = require('./token.js');
const process = require('process');

var users = {};

var test = {};

var timer = {};
 
var protocol = {};

var photos = {};

var passwords = {};


function isNumber(n){
  return Number(n)=== n;
}

// Создать бота с полученным ключом
const bot = new Telegraf(token());

bot.help((ctx =>
  {
    try{
      ctx.reply(
`Привет! Я бот для помощи админам телеграм - каналов. 
Ты можешь выставить свой канал при помощи команды /start [имя канала] [пароль для бота]
При помощи команды /fight я перейду в боевой режим
При помощи команды /test можно вернутся в тестовый режим 
При помощи команды /go начинается постинг фото
              
Я буду пересылать все фото, которые ты мне скинешь в твой канал с установленным тобой таймером. 
Ты можешь выставить таймер при помощи команды /timer + [минуты], тогда я буду отправлять полученные от тебя фото раз в установленное кол-во минут, делая постингв твоем канале более регулярным 
При помощи команды /go можно запустить отправку загруженных тобой фото в твой канал с установленным таймером
Пример команд для запуска:
     
/start @some_chanel password_for_bot
/fight
/timer 10
/go
*send some photo*
/stop
       
По вопросам связанным с ботом можно обращаться к @Lunitary \n
`)}
catch{console.log('fail')}
}))

// Обработчик начала диалога с ботом
bot.start((ctx) =>
  {
    if(passwords[ctx.message.text.split(' ')[1]] == undefined)
      passwords[ctx.message.text.split(' ')[1]] = ctx.message.text.split(' ')[2];
    else
      if(passwords[ctx.message.text.split(' ')[1]] != ctx.message.text.split(' ')[2])
        {
          ctx.reply("У вас нет доступа к постингу в этом канале");
          return 0;
        }
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
  try{
  var userid = ctx.chat.id;
    ctx.telegram.sendMessage(users[userid], 'test').catch(err => {
      delete users[userid];
      ctx.telegram.sendMessage(userid, 'Используйте команду /start еще раз, я не смог написать в ваш телеграм канал');  
      console.log(users);
      return 0;
    })
    ctx.telegram.sendMessage(userid, 'Перевел вас в боевой режим. Теперь сообщения отправляются в ваш канал.');
    test[userid] = 0;
}
  catch{console.log("failed")}
})

bot.command("test", async (ctx) => 
  {
    try{
    ctx.telegram.sendMessage(userid, 'Перевел вас обратно в тестовый режим. Ваш канал сброшен.');  
    delete users[userid];
    test[ctx.chat.id] = 1;
  }
  catch{console.log('failed')}
}
)

bot.command("stat", async(ctx) =>{
  try{fetch(`https://api.telegram.org/bot${token()}/getChatMembersCount?chat_id=${ctx.message.text.split(' ')[1]}`)
  .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
  .then(function(data) {
    ctx.reply(`Количество подписчиков в канале ${ctx.message.text.split(' ')[1]} = ${data["result"]}`);
  })}
  catch{console.log('failed')}
})

bot.command("timer", async (ctx) => 
  {
    try{var userid = ctx.chat.id;
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
  }catch{console.log('failed')}}
)


//вот тут url - это ссылка на скачивание
/*bot.on('photo', ctx => {
  const files = ctx.update.message.photo;
  fileId = files[1].file_id
  ctx.telegram.getFileLink(fileId).then(url => {
 
  })
});*/

bot.command("show", async(ctx) =>
{
  try
  {
    //ctx.reply("Вот фото для отправки");
    var user = users[ctx.chat.id];
    let name = 'в ' + user;
    if(user == undefined)
    {user = ctx.chat.id
    name = "вам"}
    var i = 0;

    while(photos[user][i] != undefined)
      {
        let photo = photos[user][i];
        //console.log(photo);
        ctx.telegram.sendPhoto(ctx.chat.id, photo[0], {'caption': `файл для отправки ${name}`});
        i++;
      }

  }
    catch(e){console.log('failed: ', e)}
    
})



bot.command("go", async(ctx) =>
{
  try
  {ctx.reply("начал отправлять фото в ваш канал");
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
    }}
    catch{console.log('failed')}
    
})

bot.command('kill', (ctx) =>{
  if(ctx.message.text.split(' ')[1] == '123'){
    ctx.reply("Перезапускаюсь...");
    process.send({
      command: 'KILL_ME_PLEASE',
    });
  }
  else{
    console.log('Попытка доступа от ', ctx.from.first_name, ctx.from.last_name, ', передай ему, что он пидор');
    ctx.reply('А может пошел ты? Я о тебе сообщил, пидор!');
  }
})

bot.on('photo', (ctx) => {
  try{
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
  );*/}
  catch{console.log('failed')}
});


// Обработчик простого текста
bot.on("text", (ctx) => {
  return ctx.reply(ctx.message.text);
});

// Запуск бота
const cluster = require('cluster');

const makeWorker = () => {
    const worker = cluster.fork();

    worker.on('message', (data) => {
      if (data.command === 'KILL_ME_PLEASE') {
          worker.destroy();
          console.log('Воркер убит');
      }
    });

    worker.on('exit', () => {
        makeWorker();
    });
};

if (cluster.isPrimary) {
    console.log('Мастер запущен');

    makeWorker();
} else {
    console.log('Воркер запущен');
    bot.launch();
    
}
