import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

export default function InputField(props) {
  const [value, setValue] = useState(props.defaultValue);

  let handleChange = (event) => {
    let val = event.target.value;
    setValue(val);
    props.onChange(val);
  };

  return (
    <TextField label={props.label} onChange={handleChange} defaultValue={props.defaultValue} />
  );
}
