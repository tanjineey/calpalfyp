const express = require('express')
const app = express()
const port = 3000
const setup = require("./setup.js");



app.get('/', function (req, res) {
  res.send('hello')
});


setup.message();

// app.get('/', (req,res)=>{
//     // creation of new document
//     db.collection("avatars").doc("zonghan").set({
//         'name': 'zonghan',
//         'age': 25
//     })
//     res.send("pretty cool stuff")
// })

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

