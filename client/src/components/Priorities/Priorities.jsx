import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputAdornment from "@mui/material/InputAdornment";
import WhatshotIcon from '@mui/icons-material/Whatshot';

import { handleChange } from "../../services/changesHandler";

const Priorities = ({ prioritiesList, onPriorityChanged, value }) => {
  const [priority, setPriority] = useState(prioritiesList[0]);

  useEffect(() => {
    if (value && value !== priority) {
      setPriority(value);
    }
  }, [value, priority]);

  return (
    <Autocomplete
      id='setPriority'
      options={prioritiesList}
      openOnFocus
      clearOnEscape
      value={priority}
      onChange={(event, option) => handleChange(event, option, setPriority, onPriorityChanged)}
      sx={{ width: '50%' }}
      getOptionLabel={(option) => option.label ?? priority.label}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Priority"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {priority ? <WhatshotIcon sx={{ color: priority.color }} /> : null}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.label}>
          <ListItemIcon>
            <WhatshotIcon sx={{ color: option.color }} />
          </ListItemIcon>
          <ListItemText primary={option.label} />
        </ListItem>
      )}
    />
  );
};

export default Priorities;
