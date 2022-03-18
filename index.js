const express = require('express')
const app = express()
const port = 3000
const setup = require("./setup.js");



setup.message();

// app.get('/', (req,res)=>{
//     // creation of new document
//     db.collection("avatars").doc("zonghan").set({
//         'name': 'zonghan',
//         'age': 25
//     })
//     res.send("pretty cool stuff")
// })
var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

