const express = require('express')
const app = express()
const port = 3000
const setup = require("./setup.js");
var bodyParser = require ('body-parser');
app.use(bodyParser.json());


app.post('/', (req, res) => {
setup.bot.processUpdate(req.body);
res.status(200).json({message:'ok'})
});


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

