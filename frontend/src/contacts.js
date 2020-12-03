import { createStyles, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

let contacts = {
    1: { name: 'Oliver Hansen', email: 'javapoppa@gmail.com' },
    2: { name: 'Van Henry', email: 'tsaamink@gmail.com' },
    3: { name: 'April Tucker', email: 'javapoppa@gmail.com' }
    // { name: 'Ralph Hubbard', email: 'tsaamink@gmail.com' }},
    // { name: 'Omar Alexander', email: 'javapoppa@gmail.com' }},
    // { name: 'Carlos Abbott', email: 'tsaamink@gmail.com' }},
    // { name: 'Miriam Wagner', email: 'javapoppa@gmail.com' }},
    // { name: 'Bradley Wilkerson', email: 'tsaamink@gmail.com' }},
    // { name: 'Virginia Andrews', email: 'javapoppa@gmail.com' }},
    // { name: 'Kelly Snyder', email: 'tsaamink@gmail.com' }}
};

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

  getContacts();
  console.log('backendContacts: ', backendContacts);

  function getContacts() {
    let requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch( "http://localhost:4000/api/contacts", requestOptions)
      .then( response => response.json() )
      .then( data => {
        console.log('data: ', data);
        setBackendContacts(data);
        return data;
      })
      .catch( error => {
        console.log('erro;r: ', error);
      });
  }

/*
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  */
  const handleChange = (event) => {
      console.log('event.target.value: ', event.target.value);
      setPersonId(event.target.value);
      props.onChange(contacts[event.target.value]);
  }

  // let componentDidMount = () => {
  //   let lContacts = getContacts();
  //   setContacts(lContacts);
  //
  //   if( contacts ) {
  //     content =
  //   }
  // };
  let contactList = Object.keys(contacts);

  // console.log(contactList.toString());

  let optionList = contactList ? contactList.map((contactId) => (
    <option key={contacts[contactId].name} value={contactId}>
      {contacts[contactId].name}
    </option>
  )) : '';

  let componentDidMount = () => {
    if( backendContacts ) {
      contactList = Object.keys(backendContacts);
      console.log('contactList: ', contactList);

      // console.log(contactList.toString());
      let optionList = contactList ? contactList.map((contactId) => (
        <option key={contacts[contactId].name} value={contactId}>
          {contacts[contactId].name}
        </option>
      )) : '';
    }
    // Establish initial selection
    setPersonId(contactList[0]);
    props.onChange(contacts[contactList[0]]);
  };

  useEffect( componentDidMount, [JSON.stringify(contactList), JSON.stringify(backendContacts)]);
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
