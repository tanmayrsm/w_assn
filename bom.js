var email 	= require("emailjs");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/mail',(req,res) => {
  console.log("barbara");
  console.log(req.body);

  var server = email.server.connect({
            user: 'tushartiwari211998@gmail.com',
            password: 'tushar@1239',
            host: 'smtp.gmail.com',
            ssl: true
          });
          
          server.send({
            text: req.body.stringname,
            from: 'todoist',
            to: req.body.to,
            cc: '',
            subject: req.body.message
          }, function (err, message) {
            console.log(err || message);
          });
});
const PORT  = process.env.PORT||3002

app.listen(PORT ,() => {
  console.log(`server runs on ${PORT}`);
})
        