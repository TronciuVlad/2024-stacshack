import TextField from '@mui/material/TextField';
import React from 'react';

function TextFieldComponent() {
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      console.log(e.target.value); // Prints the current value of the text field to the console
    }
  }

  return (
    <TextField
      label="Search"
      variant="outlined" 
      onKeyDown={handleKeyPress}
      sx={{ width: '450%', bgcolor: 'background.paper' }} 
    />
  );
}

export default TextFieldComponent;