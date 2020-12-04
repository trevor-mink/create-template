import { createStyles, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles( theme =>
  createStyles({
    paper: {
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
      minWidth: 200,
      maxWidth: 500,
    },
  }),
);

export default function Contacts(props) {
  const classes = useStyles();

  // ***************************************************************
  // Keep the following in the state
  // Id of the contact, so we can lookup the email and the name
  const [personId, setPersonId] = useState(0);
  // The contacts pulled from the backend
  const [backendContacts, setBackendContacts] = useState(null);
  // The list of contact IDs to help with populating the select list
  const [contactIDs, setContactIDs] = useState([]);
  // The html of the actual options of the select list
  const [optionList, setOptionList] = useState('');
  // ***************************************************************

  useEffect( () => {
    async function getContacts() {
      let requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      // Get the contacts from the backend
      let response = await fetch( "http://localhost:4000/api/contacts", requestOptions);
      const contactsJson = await response.json();
      let contacts = JSON.parse(contactsJson);

      // Put the contacts into the state
      //console.log('body: ', contacts);
      setBackendContacts(contacts);

      let contIdKeys = Object.keys(contacts);
      //console.log('contIdKeys: ', contIdKeys);
      setContactIDs(contIdKeys);

      // Establish initial selection
      if( contIdKeys && contIdKeys[0] ) {
        setPersonId(contIdKeys[0]);
        props.onChange(contacts[contIdKeys[0]]);
      }

      // Generate the html for the option list and put it in the state
      // The result is referenced in the html that is returned
      setOptionList(contIdKeys.map((contactId) => (
        <option key={contacts[contactId].name} value={contactId}>
          {contacts[contactId].name}
        </option>
      )));
    }
    // It is defined above, now call it
    getContacts();
  }, []);

  // Handle selection of contact who is to receive the email.
  const handleChange = (event) => {
      //console.log('event.target.value: ', event.target.value);
      setPersonId(event.target.value);
      props.onChange(backendContacts[event.target.value]);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="select-multiple-native">
        Contacts to get email
      </InputLabel>
      <Select
        native
        value={personId}
        onChange={handleChange}
        inputProps={{
          id: 'select-multiple-native',
        }}
      >
        {optionList}
      </Select>
    </FormControl>
  );
}
