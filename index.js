const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config()
const app = express()
const port = 5000

app.use(bodyParser.json());
app.use(cors());

// DB_NAME = volunteer-network
// DB_USER = volunteer
// DB_PASS = volunteer004
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nisha123:nisha007@cluster0.pgiio.mongodb.net/volunteer?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
client.connect(err => {
  const registeredCollection = client.db("volunteer").collection("registration");

  app.post('/addNewUser', (req, res) => {
    const newRegisteredActivity = req.body;
    registeredCollection.insertOne(newRegisteredActivity)
    .then(result => {    res.send(result.insertedCount > 0)})
    console.log(req.body)
    console.log(err);
  })

app.get('/activity', (req, res) => {
  registeredCollection.find({email: req.query.email})
  .toArray((err, documents)=> {
      res.send(documents);
  })
})

app.get('/activityAll', (req, res) => {
  registeredCollection.find({})
  .toArray((err, documents)=> {
      res.send(documents);
  })
})


});



app.listen(port)
