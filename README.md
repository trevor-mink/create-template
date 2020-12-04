About the application

The application consists of a frontend application and a backend application written with node and express.

The frontend application is a react application, created with npm create-react-app. It is a Single Page Application that is used to select a customer to which to send a targeted marketing email. It brings up a template in a textarea. The template contains three specific tags. The user is able to select values with which to replace the tags. One of the tags is the customer's first name. The customer is selected and his name and email are pulled automatically in order to place his name in the email and send the email to his address.

The backend application serves the contact data to the client. The contact data contains the names and corresponding email addresses. The backend also does the actual send of the email.

The frontend and backend application folders each contain README.md files that have additional information about each application.

The application was developed and tested on a windows machine using gitbash as an execution environment. In theory, it should run on linux, mac, but has not been tested on them.


To run the application...
1. Simply run the start.sh shell script in the top level folder.
   (This will run the backend node application in the background and then run 
    the frontend react application in the foreground.)

Alternately, you can run the two applications separately in separate windows..
1. In the backend folder, run the following from a unix command line:
      node app
2. In the frontend folder, run the following from a unix command line:
      npm start   
      (Note that this is development mode. See the frontend/README.md for build and run in production mode).

How to use the application.
1. The application pre-populates with an email template. The pre-populated template contains one instance each of all of the tags that are supported:
{{contact_first_name}}, {{discount_rate}}, and {{discount_code}}.
2. The user may modify the template. He/she can add additional instances of any or all of the tags.
3. The user can modify the Discount Rate and Discount Code text fields and can select a contact from the select box (this data gets populated from the backend automatically).
4. The user clicks Preview email, which brings up a modal dialog with the email template with all of the tags populated by the selected values.
5. The modal dialog has two buttons at the bottom. Clicking the 'Send..' button with send the email as shown in the preview. Clicking the 'Cancel' button will exit the modal without sending the email.

Improvements that should be made to the Application
1. Add unit/automation testing.
2. Remove all hard-coded configurations/data and replace appropriately (eg. the 'from' sendgrid email address put in env var and contact data in backend code moved to database and pulled from there).
3. Validation of Discount Rate and Discount Code fields on form.
4. Color scheme and positioning of the form fields could probably be improved, as well as the fonts.
5. Add a confirmation for a successful email and an error message for a failure.
6. Change name from React App in the tab title to Marketer Emailer (or something like that that is more descriptive than 'React App').
7. Change protocol for backend to https.
