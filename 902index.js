const express = require('express')
const app = express()
const port = 3000

const admin = require('firebase-admin');
const setup = require("./setup.js");
const serviceAccount = require('./calpal-86616-9af3ad65df6f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = '5084768499:AAGjpvhbDCY45Ay-Ac5Z1UsQ1f5QNHmbR6Q';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) =>{
  const chatId = msg.chat.id;
  setup.check(msg,bot,chatId);
  console.log(msg.text);
 
});

// // Matches "/echo [whatever]"
bot.on("polling_error", console.log);

bot.on(['/keyboard','/back'], msg => {
  const chatId = msg.chat.id;
  let replyMarkup = bot.keyboard([
      ['/buttons', '/inlineKeyboard'],
      ['/start', '/hide']
  ], {resize: true});

  return bot.sendMessage(chatId, 'Keyboard example.', {replyMarkup});

});
bot.onText(/\/echo (.+)/, (msg, match) => {
  setup.echo(bot,chatId,msg);
});
bot.onText(/\/keyboard/,(msg) => {
  let replyMarkup = bot.keyboard([
    ['/buttons', '/inlineKeyboard'],
    ['/start', '/hide']
], {resize: true});

return bot.sendMessage(chatId, 'Keyboard example.', {replyMarkup});
});
// Buttons
bot.on('/buttons', msg => {

  let replyMarkup = bot.keyboard([
      [bot.button('contact', 'Your contact'), bot.button('location', 'Your location')],
      ['/back', '/hide']
  ], {resize: true});

  return bot.sendMessage(msg.from.id, 'Button example.', {replyMarkup});

});

// Hide keyboard
bot.on('/hide', msg => {
  return bot.sendMessage(
      msg.from.id, 'Hide keyboard example. Type /back to show.', {replyMarkup: 'hide'}
  );
});

app.get('/', (req,res)=>{
    // creation of new document
    db.collection("avatars").doc("zonghan").set({
        'name': 'zonghan',
        'age': 25
    })
    res.send("pretty cool stuff")
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports={TelegramBot, bot};