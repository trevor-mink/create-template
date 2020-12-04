const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');

/*
 * Initialize the express engine and setup to use bodyParser
 */
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

// Backend data - Would be in the database if there was one.
let contacts = {
    1: { name: 'Simon Barjonas', email: 'javapoppa@gmail.com' },
    2: { name: 'Van Henry', email: 'tsaamink@gmail.com' },
    3: { name: 'April Tucker', email: 'javapoppa@gmail.com' },
    4: { name: 'Ralph Hubbard', email: 'tsaamink@gmail.com' },
    5: { name: 'Omar Alexander', email: 'javapoppa@gmail.com' },
    6: { name: 'Carlos Abbott', email: 'tsaamink@gmail.com' },
    7: { name: 'Miriam Wagner', email: 'javapoppa@gmail.com' },
    8: { name: 'Bradley Wilkerson', email: 'tsaamink@gmail.com' },
    9: { name: 'Virginia Andrews', email: 'javapoppa@gmail.com' },
    10: { name: 'Kelly Snyder', email: 'tsaamink@gmail.com' }
  };

// Chunk of code from Twilio to use sendGrid email service.
function sendEmail(req, res) {
  console.log('req.body: ', req.body);
  let email = req.body.email;
  let emailTo = req.body.to;
  let emailFrom = req.body.from;
  let emailSubject = req.body.subject;
  console.log('email: ', email);
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  // javascript
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('apikey: ', process.env.SENDGRID_API_KEY);
  const msg = {
    to: emailTo, // Change to your recipient
    from: emailFrom, // Change to your verified sender
    subject: emailSubject,
    text: email,
    html: '<pre>'+email+'</pre>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error);
      console.log('errors: ', JSON.stringify(error.response.body.errors));
    });
}

// Get the static data and return it.
function getContacts() {
  let retContacts = JSON.stringify(contacts);
  console.log("Returning contacts: ", retContacts);
  return retContacts;
}

// endpoint to send the email.
app.post('/api/sendEmail', sendEmail);

// Send the data back to the client.
app.get('/api/contacts', (req, res) => {
  let contacts = getContacts();
  res.send(JSON.stringify(contacts));
});

/*
 * Start up the server on port 4000
 */
app.listen(4000, () => {
  console.log('Gallery Web app service listening on port 4000!');
});
