const express = require('express')
const app = express()
const port = 3000

const admin = require('firebase-admin');

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

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
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