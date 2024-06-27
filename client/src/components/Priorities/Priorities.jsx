import { useState } from "react";
import { Autocomplete, TextField, ListItem, ListItemIcon, ListItemText, InputAdornment } from "@mui/material";

const Priorities = ({ prioritiesList, onPriorityChanged }) => {
  const [priority, setPriority] = useState(prioritiesList[0]);

  const handleChange = (event, newValue) => {
    setPriority(newValue);
    onPriorityChanged(newValue)
  };

  return (
    <Autocomplete
      id='setPriority'
      options={prioritiesList}
      openOnFocus
      clearOnEscape
      defaultValue={prioritiesList[0]}
      value={priority}
      onChange={handleChange}
      sx={{width: '50% '}}
      getOptionLabel={(option) => option.label ?? priority.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Priority"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {priority ? priority.icon : null}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.label}>
          <ListItemIcon>{option.icon}</ListItemIcon>
          <ListItemText primary={option.label} />
        </ListItem>
      )}
    />
  )
}

export default Priorities;