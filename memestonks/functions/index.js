const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
var admin = require("firebase-admin");

var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.get('/', (req, res) => {
  console.log("helloworld")
  return res.status(200).send('Hello World!');
});

exports.app = functions.https.onRequest(app);