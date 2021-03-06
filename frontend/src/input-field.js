import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

// InputField tag
// Freeform text input fields that return date back to parent via onChange prop
// Used to handle Discount Rate and Discount Code fields
export default function InputField(props) {
  const [value, setValue] = useState(props.defaultValue);

  // Get the value the user entered in the field, put it in the state, and then
  // signal the parent using the props.onChange call.
  let handleChange = (event) => {
    let val = event.target.value;
    setValue(val);
    props.onChange(val);
  };

  return (
    <TextField label={props.label} onChange={handleChange} defaultValue={props.defaultValue} />
  );
}
