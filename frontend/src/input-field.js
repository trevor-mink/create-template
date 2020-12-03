import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

export default function InputField(props) {
  const [value, setValue] = useState(props.defaultValue);

  let handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <TextField label={props.label} onChange={handleChange} defaultValue={props.defaultValue} />
  );
}
