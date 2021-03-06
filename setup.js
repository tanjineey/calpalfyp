const TelegramBot = require('node-telegram-bot-api');
const avatar = require("./avatar.js");
const keyboard = require("./keyboards.js");
const token = require("./token")
let bot;

// Create a bot that uses 'polling' to fetch new updates
if(process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token.token);
  bot.setWebHook('https://calpalfyp.herokuapp.com/');
}
else {
  bot = new TelegramBot(token.token, { polling: true });
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
  const getsearchname = async(userId, chatId, prompt) =>{
    const sendPrompt = async (prompt) =>{
      const sentPrompt = await bot.sendMessage(chatId,prompt,{
        reply_markup:{
          force_reply:true,
        }
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
    }else {
      var quizexists = await(avatar.checkQuizexists(userId,name));
      var examexists = await(avatar.checkExamexists(userId,name));
      var assignexists = await(avatar.checkAssignexists(userId,name));
      var meetingexists = await(avatar.checkMeetingexists(userId,name));
      if(quizexists || examexists || assignexists || meetingexists == true){
        return name;
      }else{
        console.log('run getname for quiz again')
        return await getsearchname(userId,chatId,'No such event exists, try again or send \'\/Cancel\' to close search'); 
      }
    }
  }
  const geteditQuizname = async(userId, chatId, prompt) =>{
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
    }else {
      var quizexists = await(avatar.checkQuizexists(userId,name));
      if(quizexists == false){
        console.log('run getname for quiz again')
        return await geteditQuizname(userId,chatId,'No such name exists, please key in the correct name'); 
      }
      else {
        return name;
      }  
    }
  }
  const geteditExamname = async(userId, chatId, prompt) =>{
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
    }else {
      var examexists = await(avatar.checkExamexists(userId,name));
       if(examexists == false){
        console.log('run getname for exam again')
        return await geteditExamname(userId,chatId,'No such name exists, please key in the correct name'); 
      }
      else {
        return name;
      }  
    }
  }
  const geteditAssignname = async(userId, chatId, prompt) =>{
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
    }else {
      var assignexists = await(avatar.checkAssignexists(userId,name));
     if (assignexists == false){
        console.log('run getname for assignment again')
        return await geteditAssignname(userId,chatId,'No such name exists, please key in the correct name'); 
      }
      else {
        return name;
      }  
    }
  }
    const geteditMeetingname = async(userId, chatId, prompt) =>{
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
    }else {
      var meetingexists = await(avatar.checkMeetingexists(userId,name));
     if (meetingexists == false){
        console.log('run getname for meeting again')
        return await geteditMeetingname(userId,chatId,'No such name exists, please key in the correct name'); 
      }
      else {
        return name;
      }  
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
  var job = new CronJob('00 00 10 * * 0-6', async function() {
  var userId = msg.from.id; 
  var chatId = msg.chat.id;
  var date = msg.date; 
    // console.log(avatar.getUpcoming(userId,date));
    var meetingreply = await avatar.getUpcomingMeeting(userId,date);
    var assignreply = await avatar.getUpcomingAssignments(userId,date);
    var examreply = await avatar.getUpcomingExam(userId,date);
    var quizzesreply = await avatar.getUpcomingQuiz(userId,date);

    bot.sendMessage(chatId, `Good Morning, here's what's upcoming in your week ahead: \n` +
      '*Assignments*\n' + assignreply.join("").toString()+ '*Meetings*\n' + meetingreply.join("").toString()+ '*Exams*\n' + examreply.join("").toString() + '*Quizzes*\n' + quizzesreply.join("").toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,
      }), 
      parse_mode:'Markdown'
    });
  }, null, true, 'Asia/Singapore');
  job.start();
    
    // const reply = bot.sendMessage(chatId,resp);
    // return bot.sendMessage(chatId,resp);
    var reply ='Hi ' + msg.chat.first_name +  ' I\'m Calpal. ???? Here are a list of commands to get me started! \n \/create - to create a new Quiz, Assignment, Exam or meeting \n \/edit - to edit your created events \n \/upcoming - to view your upcoming events \n \/delete - to delete an existing event  \n \/search - to search for your events by name \n   ';
    var reply2 ='If you would like to stop your action at anytime, just press \/Cancel';
    avatar.createAvatar(msg.chat.first_name, msg.from.id);
    console.log(msg);
    bot.sendMessage(chatId,reply);
    bot.sendMessage(chatId,reply2);
  });
  // Create a new item 
  bot.onText(/\/create/, function (msg) {
    const chatId = msg.chat.id;
    // const reply = bot.sendMessage(chatId,resp);
    // return bot.sendMessage(chatId,resp);
    var reply ='Hi ' + msg.chat.first_name +  ' ????, I\'m your ????\nWhat event would you like to create today?';
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
  bot.onText(/???? Quiz/, async msg => {
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
  bot.onText(/???? Exam/, async msg => {
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
  bot.onText(/???? Assignment/, async msg => {
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
bot.onText(/???? Meeting/, async msg => {
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
    var noquizzes = "No assignments";
    if(assignreply.toString().indexOf(noquizzes)!== -1){
    var formatreply = assignreply;
    }else{
    var formatreply = assignreply.join("");
    }
    bot.sendMessage(chatId, '*???? Assignments* \n' + formatreply.toString(),opts = {reply_markup:  
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
    var noquizzes = "No quizzes";
    if(quizzesreply.toString().indexOf(noquizzes)!== -1){
      formatreply = quizzesreply;
    }else{
    var formatreply = quizzesreply.join("");
    }
    console.log(quizzesreply);
    bot.sendMessage(chatId, '*????Quizzes* \n' + formatreply.toString(),opts = {reply_markup:  
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
    var noquizzes = "No exams";
    if(examreply.toString().indexOf(noquizzes)!== -1){
      formatreply = examreply;
    }else{
    var formatreply = examreply.join("");
    }
    bot.sendMessage(chatId, '*????Exams* \n' + formatreply.toString(),opts = {reply_markup:  
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
    var noquizzes = "No meetings";
    if(meetingreply.toString().indexOf(noquizzes)!== -1){
      var formatreply = meetingreply;
    }else{
      var formatreply = meetingreply.join("");
    }
    console.log(meetingreply);
    bot.sendMessage(chatId, '*????Meetings* \n' + formatreply.toString(),opts = {reply_markup:  
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

    var nomeetings = "No meetings";
    if(meetingreply.toString().indexOf(nomeetings)!== -1){
      formatmeeting = meetingreply;
    }else{
    var formatmeeting = meetingreply.join("");
    }
    var noassign = "No assignments";
    if(assignreply.toString().indexOf(noassign)!== -1){
    var formatassign = assignreply;
    }else{
    var formatassign = assignreply.join("");
    }
    var noexams = "No exams";
    if(examreply.toString().indexOf(noexams)!== -1){
      formatexam= examreply;
    }else{
    var formatexam = examreply.join("");
    }
    var noquizzes ="No quizzes";
    if(quizzesreply.toString().indexOf(noquizzes)!== -1){
      formatquiz = quizzesreply;
    }else{
    var formatquiz = quizzesreply.join("");
    }

    bot.sendMessage(chatId, 
      '*????Assignments*\n' + formatassign.toString()+ '*????Meetings*\n' + formatmeeting.toString()+ '*????Exams*\n' + formatexam.toString() + '*????Quizzes*\n' + formatquiz.toString(),opts = {reply_markup:  
      JSON.stringify({
        remove_keyboard: true,
      }), 
      parse_mode:'Markdown'
    });
})
  bot.onText(/\/edit/, function(msg){
    var userId = msg.from.id;
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Which event would you like to edit?',keyboard.editEventKeyboard);
  })
  bot.onText(/Edit Quiz/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editQuizList = await avatar.editQuizList(userId,date);
    var noquizzes = "No quizzes after";
    if(editQuizList.toString().indexOf(noquizzes)!== -1){
      bot.sendMessage(chatId,'There are no quizzes available for you to edit.');
    }else{
      bot.sendMessage(chatId,'This is a list of your future quizzes.\n' + editQuizList.toString());
       var nameQuiz = await geteditQuizname(userId, chatId, 'Which quiz would you like to edit?(Name of Quiz)');
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
          await bot.sendMessage(chatId,`Your ${nameQuiz} quiz has been edited to be on the ${dateQuiz} from ${timeStartQuiz} to ${timeEndQuiz}`
          );
          avatar.editQuiz(msg.from.id,nameQuiz,dateQuiz,timeStartQuiz,timeEndQuiz);
    }
  })
  bot.onText(/Edit Exam/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editExamList = await avatar.editExamList(userId,date);
    var noexams = "No exams after";
    if(editExamList.toString().indexOf(noexams)!== -1){
      bot.sendMessage(chatId,'There are no exams available for you to edit.');
    }else{
      bot.sendMessage(chatId,'This is a list of your future exams.\n' + editExamList.toString());
       var nameExam = await geteditExamname(userId, chatId, '\n Which exam would you like to edit? (Key in name of exam)');
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
    avatar.editExam(msg.from.id,nameExam,dateExam,timeStartExam,timeEndExam);
    }
  })
  bot.onText(/Edit Assignment/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editAssignList = await avatar.editAssignList(userId,date);
    var noassigns = "No assignments after";
    if(editAssignList.toString().indexOf(noassigns)!== -1){
      bot.sendMessage(chatId,'There are no assignments available for you to edit.');
    }else{
      bot.sendMessage(chatId,'This is a list of your future assignments.\n' + editAssignList.toString());
       var nameAssign = await geteditAssignname(userId, chatId, 'Which assignment would you like to edit? (Key in name of assignment)');
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
    }
  })
  bot.onText(/Edit Meeting/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editMeetingList = await avatar.editMeetingList(userId,date);
    var nomeetings = "No meetings after";
    if(editMeetingList.toString().indexOf(nomeetings)!== -1){
      bot.sendMessage(chatId,'There are no meetings available for you to edit.');
    }else{
      bot.sendMessage(chatId,'This is a list of your future meetings.\n' + editMeetingList.toString());
       var nameMeeting = await geteditMeetingname(userId, chatId, '\n Which meeting would you like to edit? (Key in name of meeting)');
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
    }
  })

  bot.onText(/\/search/, async function(msg){
    var userId = msg.from.id;
    var chatId = msg.chat.id;
    var searchreply = await getsearchname(userId, chatId, 'Key in a name to search for your events');
    bot.sendMessage(userId,'Searching for document...');
    if (searchreply =='cancel'){
      return;
    }else{
      // var searchquiz = await avatar.getsearchquiz(userId,searchreply);
      // if (searchquiz == false){
      //   console.log('no quizzes with name')
      //   var searchassign = await avatar.getsearchassign(userId,searchreply);
      //   if(searchassign == false){
      //   console.log('no assignments with name')
      //        var searchexam = await avatar.getsearchexam(userId,searchreply);
      //         if(searchexam == false){
      //           console.log('no exams with name')
      //              var searchmeeting = await avatar.getsearchmeeting(userId,searchreply);
      //             if(searchmeeting == false){
      //               console.log('no meetings with name')
      //               return;
      //             }else{
      //               bot.sendMessage(chatId,'We found a meeting relevant to your search: \n' +searchmeeting.toString());
      //             }
      //         }else{
      //           bot.sendMessage(chatId,'We found an exam relevant to your search: \n' +searchexam.toString());
      //         }
      //   }else{
      //     bot.sendMessage(chatId,'We found an assignment relevant to your search: \n' +searchassign.toString());
      //   }
      // }else{
      //   bot.sendMessage(chatId,'We found a quiz relevant to your search: \n' + searchquiz.toString());
      // }
      var searchquiz = await avatar.getsearchquiz(userId,searchreply);
      var searchassign = await avatar.getsearchassign(userId,searchreply);
      var searchexam = await avatar.getsearchexam(userId,searchreply);
      var searchmeeting = await avatar.getsearchmeeting(userId,searchreply);
      bot.sendMessage(chatId,searchquiz + searchassign + searchexam + searchmeeting);

    }
  })
  bot.onText(/\/delete/, function(msg){
    var userId = msg.from.id;
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'What would you like to delete?',keyboard.deleteEventKeyboard);
  })
  bot.onText(/Delete Quiz/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editQuizList = await avatar.editQuizList(userId,date);
    var noquizzes = "No quizzes after";
    if(editQuizList.toString().indexOf(noquizzes)!== -1){
      bot.sendMessage(chatId,'There are no quizzes available for you to delete.');
    }else{
      bot.sendMessage(chatId,'This is a list of your quizzes.\n' + editQuizList.toString() );
       var nameQuiz = await geteditQuizname(userId, chatId, 'Which quiz would you like to delete?(Name of Quiz)');
       if (nameQuiz=="cancel"){
      return;
      }
      var quizdelete = await avatar.deleteQuiz(msg.from.id,nameQuiz);
      bot.sendMessage(chatId, quizdelete);
    }
  })
   bot.onText(/Delete Exam/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editExamList = await avatar.editExamList(userId,date);
    var noexams = "No exams after";
    if(editExamList.toString().indexOf(noexams)!== -1){
      bot.sendMessage(chatId,'There are no exams available for you to delete.');
    }else{
      bot.sendMessage(chatId,'This is a list of your exams.\n' + editExamList.toString() );
       var nameExam = await geteditExamname(userId, chatId, 'Which exam would you like to delete?(Name of Exam)');
       if (nameExam=="cancel"){
      return;
      }
      var examdelete = await avatar.deleteExam(msg.from.id,nameExam);
      bot.sendMessage(chatId, examdelete);
    }
  })
 bot.onText(/Delete Assignment/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editAssignList = await avatar.editAssignList(userId,date);
    var noassigns = "No assignments after";
    if(editAssignList.toString().indexOf(noassigns)!== -1){
      bot.sendMessage(chatId,'There are no assignments available for you to delete.');
    }else{
      bot.sendMessage(chatId,'This is a list of your future assignments.\n' + editAssignList.toString());
       var nameAssign = await geteditAssignname(userId, chatId, 'Which assignment would you like to delete? (Key in name of assignment)');
      if (nameAssign=="cancel"){
      return;
      }   
        var assigndelete = await avatar.deleteAssignment(msg.from.id,nameAssign);
      bot.sendMessage(chatId, assigndelete);
    }
 })
  bot.onText(/Delete Meeting/,async function(msg){
    var userId = msg.from.id; 
    var date = msg.date;
    var chatId = msg.chat.id;
    var editMeetingList = await avatar.editMeetingList(userId,date);
    var nomeetings = "No meetings after";
    if(editMeetingList.toString().indexOf(nomeetings)!== -1){
      bot.sendMessage(chatId,'There are no meetings available for you to delete.');
    }else{
      bot.sendMessage(chatId,'This is a list of your future meetings.\n' + editMeetingList.toString());
       var nameMeeting = await geteditMeetingname(userId, chatId, '\n Which meeting would you like to delete? (Key in name of meeting)');
        if (nameMeeting=="cancel"){
    return;
  }   
   var meetingdelete = await avatar.deleteMeeting(msg.from.id,nameMeeting);
      bot.sendMessage(chatId, meetingdelete);
    }
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
