import { Autocomplete, TextField, ListItem, ListItemIcon, ListItemText, InputAdornment } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useState } from "react";

const Status = ({ statusesList, onStatusChanged, value }) => {
  const [status, setStatus] = useState(statusesList[0]);

  useEffect(() => {
    if (value && value !== status) {
      setStatus(value);
    }
  }, [value, status]);

  const handleChange = (event, newValue) => {
    setStatus(newValue);
    onStatusChanged(newValue);
  };

  return (
    <Autocomplete
      id="setStatus"
      options={statusesList}
      onChange={handleChange}
      value={status}
      getOptionLabel={(option) => option.label ?? status.label}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      openOnFocus
      clearOnEscape
      renderInput={(params) => (
        <TextField
          {...params}
          label="Status"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {status ? <CircleIcon sx={{ color: status.color }} /> : null}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.label}>
          <ListItemIcon>
            <CircleIcon sx={{ color: option.color }} />
          </ListItemIcon>
          <ListItemText primary={option.label} />
        </ListItem>
      )}
    />
  );
};

export default Status;
