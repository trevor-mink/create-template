
export default function sendEmail(from, to, subject, emailText) {

  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'javapoppa@gmail.com', to: to, subject: subject, email: emailText })
  }
  fetch( "http://localhost:4000/api/sendEmail", requestOptions)
    .then( response => response.json() )
    .then( data => {
      console.log('data: ', data);
    })
    .catch( error => {
      console.log('error: ', error);
    });

}
