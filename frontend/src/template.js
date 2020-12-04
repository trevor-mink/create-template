import React from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles( theme =>
  createStyles({
    table: { minWidth: 1000,
    },
    pageHeader: {
      position: 'fixed'
    },
  })
);

export default function Template(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.default);

  // Get the template anytime it changes and put it in the state
  // Also, signal the change to the parent and pass the contents along
  const handleChange = (event) => {
    setValue(event.target.value);
    if( props.onChange ) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div>
    <h3>{props.title}</h3>
    <TextareaAutosize cols="80" rows="10" onChange={handleChange} defaultValue={props.default} />
    </div>
  );
}
