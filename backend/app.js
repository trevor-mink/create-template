const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');

/*
 * Initialize the express engine and setup to use bodyParser
 */
const app = express();
const clientPort = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "http://localhost:"+clientPort)
  next()
})
/*
app.route('/api/login')
    .post(loginRoute)

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key')

function loginRoute(req, res) {

    const email = req.body.email,
          password = req.body.password

    if (validateEmailAndPassword()) {
       const userId = findUserIdForEmail(email)

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            })

          // send the JWT back to the user
          // TODO - multiple options available
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401)
    }
}
*/

let contacts = [
    { name: 'Oliver Hansen', email: 'javapoppa@gmail.com' },
    { name: 'Van Henry', email: 'tsaamink@gmail.com' },
    { name: 'April Tucker', email: 'javapoppa@gmail.com' },
    { name: 'Ralph Hubbard', email: 'tsaamink@gmail.com' },
    { name: 'Omar Alexander', email: 'javapoppa@gmail.com' },
    { name: 'Carlos Abbott', email: 'tsaamink@gmail.com' },
    { name: 'Miriam Wagner', email: 'javapoppa@gmail.com' },
    { name: 'Bradley Wilkerson', email: 'tsaamink@gmail.com' },
    { name: 'Virginia Andrews', email: 'javapoppa@gmail.com' },
    { name: 'Kelly Snyder', email: 'tsaamink@gmail.com' }
  ];

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

function getContacts() {
  console.log("Returning contacts: ", contacts.toString());
    return contacts;
}

app.post('/api/sendEmail', sendEmail);

app.get('/api/contacts', getContacts);
/*
 * Start up the server on port 4000
 */
app.listen(4000, () => {
  console.log('Gallery Web app service listening on port 4000!')
})
