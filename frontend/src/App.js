import './App.css';
import Template from './template';
import Contacts from './contacts';
import InputField from './input-field';
import { Button, createStyles, Select, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import mustache from 'mustache';
import sendEmail from './sendEmail';

const useStyles = makeStyles( theme =>
  createStyles({
    paper: {
      maxWidth: 1000,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2,4,3),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
  }),
);

function App() {
  const defaultTemplate =
`Hi {{contact_first_name}},

Good news!

You can get {{discount_rate}} off your next pair of shoes by using this
discount code:  {{discount_code}}.

Enjoy!

Sincerely,
Marketer
`;
  const [preview, setPreview] = useState(false);
  const [template, setTemplate] = useState(defaultTemplate);
  const [emailText, setEmailText] = useState("");
  const [recipient, setRecipient] = useState({name: '', email: ''});

  // Hold discount rate in state. Set the default here.
  const [discountRate, setDiscountRate] = useState("30%");
  // Hold discount code in state. Set the default here.
  const [discountCode, setDiscountCode] = useState("DISCOUNT30");

  // Handle the closing of the modal that contains the preview.
  const handleClose = () => {
    setPreview(false);
  };

  // Handle changes to the email template
  const handleChange = (value) => {
    setTemplate(value);
  };
  const classes = useStyles();

  let replaceKeys = (template, keyValues) => {
    return mustache.render(template, keyValues);
  };

  // Make the text replacements and store the email text in the state.
  let processTemplate = () => {
    let keyValues = { contact_first_name: recipient.name ? recipient.name.split(' ')[0] : '',
                      discount_rate: discountRate,
                      discount_code: discountCode };
    // Replace keys with values
    let email = replaceKeys(template, keyValues);

    // Store email in the state.
    setEmailText(email);
  };

  // Bring up the email with replaced text, into the modal dialog.
  const previewEmail = () => {
    processTemplate();
    setPreview(true);
  };

  // Handlers for the Replacement fields' inputs
  const handleContactSelection = (value) => {
    setRecipient(value);
  };
  const handleSetDiscountRate = (value) => {
    setDiscountRate(value);
  };
  const handleSetDiscountCode = (value) => {
    setDiscountCode(value);
  };

  const handleSendMail = () => {
    sendEmail('javapoppa@gmail.com', recipient ? recipient.email : '', 'Discount Offer', emailText);
    setPreview(false);
  };

  return (
    <div className="App">
      <header className="App-header">
      <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
        <Grid item sm={12}>
          <Template title="Email Template" default={defaultTemplate} onChange={(newValue) => { handleChange(newValue) }} />
        </Grid>
        <Grid item xs={4}>
          <Contacts onChange={handleContactSelection} />
        </Grid>
        <Grid item xs={4}>
        <InputField onChange={(value) => handleSetDiscountRate(value)} defaultValue={discountRate} label="Discount Rate" />
        </Grid>
        <Grid item xs={4}>
        <InputField onChange={(value) => handleSetDiscountCode(value)} defaultValue={discountCode} label="Discount Code" />
        </Grid>
        <p></p>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
        <Button onClick={() => { previewEmail(); }}>Preview email</Button>
        <Modal open={preview} onClose={handleClose} className={classes.modal}>
          <div className={classes.paper}>
          <pre>{emailText}</pre>
          <div align="center">
          <Button onClick={() => handleSendMail() }>Send Email to {recipient ? recipient.email : ''}</Button>
          <Button onClick={() => { setPreview(false) }}>Cancel (do NOT send)</Button>
          </div>
          </div>
        </Modal>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
