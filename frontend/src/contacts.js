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
  //const [contacts, setContacts] = useState();
  const classes = useStyles();

  //const [personName, setPersonName] = useState([]);
  const [personId, setPersonId] = useState(0);
  const [backendContacts, setBackendContacts] = useState(null);
  const [contactIDs, setContactIDs] = useState([]);
  const [optionList, setOptionList] = useState('');
  console.log('backendContacts: ', backendContacts);

  useEffect( () => {
    async function getContacts() {
      let requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      let response = await fetch( "http://localhost:4000/api/contacts", requestOptions);
      const contactsJson = await response.json();
      let contacts = JSON.parse(contactsJson);

      console.log('body: ', contacts);
      setBackendContacts(contacts);

      let contIdKeys = Object.keys(contacts);
      console.log('contIdKeys: ', contIdKeys);
      setContactIDs(contIdKeys);

      // Establish initial selection
      if( contIdKeys && contIdKeys[0] ) {
        setPersonId(contIdKeys[0]);
        props.onChange(contacts[contIdKeys[0]]);
      }

      setOptionList(contIdKeys.map((contactId) => (
        <option key={contacts[contactId].name} value={contactId}>
          {contacts[contactId].name}
        </option>
      )));
    }
    getContacts();
  }, []);

  const handleChange = (event) => {
      console.log('event.target.value: ', event.target.value);
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
