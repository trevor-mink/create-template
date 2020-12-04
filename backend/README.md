This is a server application for the email templating marketer

It serves to do the actual call to sendGrid to send the email.
It also serves the contact data back to the client.
   - the contact data contains the user name, email address and unique identifier for each contact that is the key for the user data in the JSON data that is returned.

The server listens on port 4000

It currently is open to listen to any domain.

Getting Started

# to run the server application
node app
