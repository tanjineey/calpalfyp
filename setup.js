var token = '5084768499:AAGjpvhbDCY45Ay-Ac5Z1UsQ1f5QNHmbR6Q';
const TelegramBot = require('node-telegram-bot-api');
const avatar = require("./avatar.js");
const keyboard = require("./keyboards.js");
let bot;
// Create a bot that uses 'polling' to fetch new updates
if(process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook('https://calpalfyp.herokuapp.com/');
}
else {
  bot = new TelegramBot(token, { polling: true });
}  
  const getname = async(chatId, prompt) =>{
    const sendPrompt = async (prompt) =>{
      const sentPrompt = await bot.sendMessage(chatId,prompt,{
        reply_markup:{
          force_reply:true,
        },
      });
      const userInput =await new Promise(resolve=> bot.onReplyToMessage(chatId,sentPrompt.message_id,
      resolve)
      )
      return userInput;
    }
    const userInput = await sendPrompt(prompt);
    const name = userInput.text;
    if(name =='/cancel'){
      await bot.sendMessage(chatId,'Operation Cancelled', {reply_markup:  
        JSON.stringify({
          remove_keyboard: true
        })
      })
      return 'cancel';
    }else{
      return name;
    }
  }

  const getDate = async(chatId, prompt) =>{
    const sendPrompt = async (prompt) =>{
      const sentPrompt = await bot.sendMessage(chatId,prompt,{
        reply_markup:{
          force_reply:true,
        },
      });
      const userInput =await new Promise(resolve=> bot.onReplyToMessage(chatId,sentPrompt.message_id,
      resolve)
      )
      return userInput;
    }
    const userInput = await sendPrompt(prompt);
    const dateCheckerreg = new RegExp (/^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/);
    const date = userInput.text;
    if(date =='/cancel'){
      await bot.sendMessage(chatId,'Operation Cancelled', {reply_markup:  
        JSON.stringify({
          remove_keyboard: true
        })
      })
      return 'cancel';
      
    } else if (!dateCheckerreg.test(date)){
      return await getDate(chatId,`Please key in date in correct format 'DD-MM-YYYY'`)
    }else{
      return date;
    }
  }

  const getStartTime = async(chatId, prompt) =>{
    const sendPrompt = async (prompt) =>{
      const sentPrompt = await bot.sendMessage(chatId,prompt,{
        reply_markup:{
          force_reply:true,
        },
      });
      const userInput =await new Promise(resolve=> bot.onReplyToMessage(chatId,sentPrompt.message_id,
      resolve)
      )
      return userInput;
    }
    const userInput = await sendPrompt(prompt);
    const startTime = userInput.text;
    
    const timeCheckerreg = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
    if(startTime =='/cancel'){
      await bot.sendMessage(chatId,'Operation Cancelled', {reply_markup:  
        JSON.stringify({
          remove_keyboard: true
        })
      })
      return 'cancel';
      
    }else if(!timeCheckerreg.test(startTime)){
      return await getStartTime(chatId, `Please key in time in 24-hour clock format (i.e. 1pm is 1300)`)
    }else{
      return startTime;
    }
  }
  const getEndTime = async(chatId, prompt) =>{
    const sendPrompt = async (prompt) =>{
      const sentPrompt = await bot.sendMessage(chatId,prompt,{
        reply_markup:{
          force_reply:true,
        },
      });
      const userInput =await new Promise(resolve=> bot.onReplyToMessage(chatId,sentPrompt.message_id,
      resolve)
      )
      return userInput;
    }
    const userInput = await sendPrompt(prompt);
    const endTime = userInput.text;
    const timeCheckerreg = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
    if(endTime =='/cancel'){
      await bot.sendMessage(chatId,'Operation Cancelled', {reply_markup:  
        JSON.stringify({
          remove_keyboard: true
        })
      })
      return 'cancel';
      
    }if(!timeCheckerreg.test(endTime)){
      return await getEndTime(chatId, `Please key in time in 24-hour clock format (i.e. 1pm is 1300)`)
    }else{
      return endTime;
    }
  }


  bot.onText(/\/start/,  function(msg)  {
    const userId = msg.from.id;
    const chatId = msg.chat.id;
    const date = msg.date;
  var CronJob = require('cron').CronJob;
  var job = new CronJob('00 05 21 * * 0-6', async function() {
    var getUpcoming = await avatar.getUpcoming(userId,date);
    console.log(getUpcoming);
    var reply = `Good Morning, here's what's upcoming in your week ahead: \n ${getUpcoming}`;
    bot.sendMessage(chatId,reply);
  }, null, true, 'Asia/Singapore');
  job.start();
    
    // const reply = bot.sendMessage(chatId,resp);
    // return bot.sendMessage(chatId,resp);
    var reply ='Hi ' + msg.chat.first_name +  ' I\'m Calpal. 🙌 Here are a list of commands to get me started! \n \/create - to create a new Quiz, Assignment, Exam or meeting \n \/edit - to edit your created events \n \/scan - to convert a picture you\'ve taken to text \n \/upcoming - to view your upcoming events \n \/todo - to create your todo list for the day  \n \/search - to search for your events by name \n \/settings - to change your daily notification timing \n\n   ';
    avatar.createAvatar(msg.chat.first_name, msg.from.id);
    console.log(msg);
    
    bot.sendMessage(chatId,reply);
  });
  // Create a new item 
  bot.onText(/\/create/, function (msg) {
    const chatId = msg.chat.id;
    // const reply = bot.sendMessage(chatId,resp);
    // return bot.sendMessage(chatId,resp);
    var reply ='Hi ' + msg.chat.first_name +  ' 🙌, I\'m your 🤖\nI\'ve been created to give you all the information you need';
    bot.sendMessage(chatId,reply,keyboard.createEventKeyboard);
  });
  // //next Message function to detect the next message 
  // bot.nextMessage = {};
  // bot.onNextMessage = (chatId, callback) => {
  //   let promise = new Promise((resolve) => {
  //       this.bot.nextMessage[chatId] = { callback: callback, next: resolve };
  //   });
  //   return promise;
  // }
  // Quiz response
  bot.onText(/📋 Quiz/, async msg => {
    const chatId = msg.chat.id;
    var nameQuiz = await getname(chatId, 'What is the name of your quiz?', {
      reply_markup:{
        force_reply:true,
      },
    });
    if (nameQuiz=="cancel"){
      return;
    }   
    var dateQuiz = await getDate(chatId, `What is the date of your ${nameQuiz} quiz? (DD-MM-YYYY)`, {
      reply_markup: {
        force_reply: true,
      }
    });
    if (dateQuiz=="cancel"){
      return;
    }
    var timeStartQuiz = await getStartTime(chatId, `What time does your quiz on ${dateQuiz} start?(24hr format, 1300 is 1pm)`,{
      reply_markup: {
        force_reply: true,
      }
    });
    if (timeStartQuiz=="cancel"){
      return;
    }
    var timeEndQuiz = await getEndTime(chatId,`What time does your ${nameQuiz} quiz end?(24hr format, 1300 is 1pm)`,{
      reply_markup: {
        force_reply: true,
      }
    });  
    if (timeEndQuiz=="cancel"){
      return;
    }         
    await bot.sendMessage(chatId,`Your ${nameQuiz} quiz is scheduled on the ${dateQuiz} from ${timeStartQuiz} to ${timeEndQuiz}`
    );
    console.log(msg.from.id,nameQuiz, dateQuiz,timeStartQuiz,timeEndQuiz);
    avatar.creatingQuiz(msg.from.id,nameQuiz,dateQuiz,timeStartQuiz,timeEndQuiz);
  });
  //Exam response
  bot.onText(/📈 Exam/, async msg => {
    const chatId = msg.chat.id;
    var nameExam = await getname(chatId, 'What is the name of your exam?',{
      reply_markup:{
        force_reply:true,
      },
    });
    if (nameExam=="cancel"){
      return;
    }   
    var dateExam = await getDate(chatId, `What is the date of your ${nameExam} exam? (DD-MM-YYYY)`, {
      reply_markup: {
        force_reply: true,
      },
    });
    if (dateExam=="cancel"){
      return;
    }   
    
    var timeStartExam = await getStartTime(chatId, `What time does your exam start on ${dateExam}?(24hr format, 1300 is 1pm)`,{
      reply_markup: {
        force_reply: true,
      },
    });
    if (timeStartExam=="cancel"){
      return;
    }   
    var timeEndExam = await getEndTime(chatId,`What time does ${nameExam} end?(24hr format, 1300 is 1pm)`,{
      reply_markup: {
        force_reply: true,
      },
    });
    if (timeEndExam=="cancel"){
      return;
    }   
    await bot.sendMessage(chatId,`Your ${nameExam} is scheduled on the ${dateExam} from ${timeStartExam} to ${timeEndExam}`
    );
    console.log(msg.from.id,nameExam, dateExam,timeStartExam,timeEndExam);
    avatar.creatingExam(msg.from.id,nameExam,dateExam,timeStartExam,timeEndExam);
  })
//Assignment Response 
  bot.onText(/💻 Assignment/, async msg => {
    const chatId = msg.chat.id;
    console.log('running again');
    var nameAssign = await getname(chatId, 'What is the name of your assignment?',{
      reply_markup:{
        force_reply:true,
      },
    });
    if (nameAssign=="cancel"){
      return;
    }   
    var dateAssign = await getDate(chatId, `What is the due date of your ${nameAssign} assignment? (DD-MM-YYYY)`, {
      reply_markup: {
        force_reply: true,
      },
    });
    if (dateAssign=="cancel"){
      return;
    }   
    
    var timeAssign = await getStartTime(chatId, `What time is your assignment due on ${dateAssign}? (24hr format, 1300 is 1pm)`,{
      reply_markup: {
        force_reply: true,
      },
    });
    if (timeAssign=="cancel"){
      return;
    }   
    await bot.sendMessage(chatId,`Your ${nameAssign} is due on the ${dateAssign} at ${timeAssign}`
    );
    console.log(msg.from.id,nameAssign,dateAssign,timeAssign);
    avatar.creatingAssignment(msg.from.id,nameAssign,dateAssign,timeAssign);
  })
 
//Assignment Response 
bot.onText(/🌞 Meeting/, async msg => {
  const chatId = msg.chat.id;
  console.log('running again');
  var nameMeeting = await getname(chatId, 'What is the name of your meeting?',{
    reply_markup:{
      force_reply:true,
    },
  });
  if (nameMeeting=="cancel"){
    return;
  }   
  var dateMeeting = await getDate(chatId, `When is your '${nameMeeting}' meeting? (DD-MM-YYYY)`, {
    reply_markup: {
      force_reply: true,
    },
  });
  if (dateMeeting=="cancel"){
    return;
  }   
  
  var timeStartMeeting = await getStartTime(chatId, `What time does your meeting start on ${dateMeeting}? (24hr format, 1300 is 1pm)`,{
    reply_markup: {
      force_reply: true,
    },
  });
  if (timeStartMeeting=="cancel"){
    return;
  }  
  var timeEndMeeting = await getEndTime(chatId,`What time does ${nameMeeting} end?(24hr format, 1300 is 1pm)`,{
    reply_markup: {
      force_reply: true,
    },
  });
  if (timeEndMeeting=="cancel"){
    return;
  }   
  await bot.sendMessage(chatId,`Your ${nameMeeting} is scheduled on the ${dateMeeting} from ${timeStartMeeting} to ${timeEndMeeting}`
  );
  console.log(msg.from.id,nameMeeting, dateMeeting,timeStartMeeting,timeEndMeeting);
  avatar.creatingMeeting(msg.from.id,nameMeeting,dateMeeting,timeStartMeeting,timeEndMeeting);
})

bot.onText(/\/upcoming/,async function(msg){
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date;
  bot.sendMessage(chatId,'View your upcoming events (limited to the next 7 days)',keyboard.upcomingKeyboards);

})
   
bot.onText(/Upcoming Assignments/,async function(msg){
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date;
  
    // console.log(avatar.getUpcoming(userId,date));
    var assignreply = await avatar.getUpcomingAssignments(userId,date);
    const formatreply = assignreply.join("");
    console.log(formatreply);
    bot.sendMessage(chatId, '*Assignments* \n' + formatreply.toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,

      }), parse_mode:'Markdown'
    });
})
bot.onText(/Upcoming Quizzes/,async function(msg){
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date;
  
    // console.log(avatar.getUpcoming(userId,date));
    var quizzesreply = await avatar.getUpcomingQuiz(userId,date);
    console.log(quizzesreply);
    bot.sendMessage(chatId, '*Quizzes* \n' + quizzesreply.toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,
      }), parse_mode:'Markdown'
    });
})
bot.onText(/Upcoming Exams/,async function(msg){
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date;
  
    // console.log(avatar.getUpcoming(userId,date));
    var examreply = await avatar.getUpcomingExam(userId,date);
    console.log(examreply);
    bot.sendMessage(chatId, '*Exams* \n' + examreply.toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,
      }), parse_mode:'Markdown'
    });
})
bot.onText(/Upcoming Meetings/,async function(msg){
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date;
  
    // console.log(avatar.getUpcoming(userId,date));
    var meetingreply = await avatar.getUpcomingMeeting(userId,date);
    console.log(meetingreply);
    bot.sendMessage(chatId, '*Meetings* \n' + meetingreply.toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,
      }),
       parse_mode:'Markdown'
    });
})
bot.onText(/All upcoming/,async function(msg){
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date;
  
    // console.log(avatar.getUpcoming(userId,date));
    var meetingreply = await avatar.getUpcomingMeeting(userId,date);
    var assignreply = await avatar.getUpcomingAssignments(userId,date);
    var examreply = await avatar.getUpcomingExam(userId,date);
    var quizzesreply = await avatar.getUpcomingQuiz(userId,date);

    bot.sendMessage(chatId, 
      '*Assignments*\n' + assignreply.join("").toString()+ '*Meetings*\n' + meetingreply.join("").toString()+ '*Exams*\n' + examreply.join("").toString() + '*Quizzes*\n' + quizzesreply.join("").toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,
      }), 
      parse_mode:'Markdown'
    });
})
  bot.onText(/Cancel/,function(msg){
    var chatId = msg.chat.id;
    bot.sendMessage(chatId,'Operation Cancelled', {reply_markup:  
      JSON.stringify({
        remove_keyboard: true
      })
    })
  });

  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const resp = match[1]; // the captured "whatever"
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

module.exports = {bot};
