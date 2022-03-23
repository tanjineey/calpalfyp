const express = require('express')
const app = express()
const port = 3000
const setup = require("./setup.js");
const avatar = require("./avatar.js");
var bodyParser = require ('body-parser');
app.use(bodyParser.json());


app.post('/', (req, res) => {
setup.bot.processUpdate(req.body);
res.status(200).json({message:'ok'})
});
const user = '205550056'; 

// async function displaydata(user){
//   var date = Date.now()/1000;
//   var meetingreply = await avatar.getUpcomingMeeting(user,date);
//     var assignreply = await avatar.getUpcomingAssignments(user,date);
//     var examreply = await avatar.getUpcomingExam(user,date);
//     var quizzesreply = await avatar.getUpcomingQuiz(user,date);
//     console.log(meetingreply.toString());
// }
// displaydata(user);

app.set('view engine', 'ejs');
app.get('/',async(req,res)=>{
  const id = req.query.id;
    var date = Date.now()/1000;
   const meetingreply  = await avatar.getUpcomingMeeting(id,date);
   var quizzesreply = await avatar.getUpcomingQuiz(id,date);

   res.render('pages/index', { meetingreply, id, quizzesreply})
  // res.render('pages/index');
})
// app.get('/', (req,res)=>{
//     // creation of new document
//     db.collection("avatars").doc("zonghan").set({
//         'name': 'zonghan',
//         'age': 25
//     })
//     res.send("pretty cool stuff")
// })

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port} or ${process.env.PORT}`)
})

