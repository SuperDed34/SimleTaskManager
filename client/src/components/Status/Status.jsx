import { Autocomplete, TextField, ListItem, ListItemIcon, ListItemText, InputAdornment } from "@mui/material";
import { useState } from "react"

const Status = ({ statusesList, onStatusChanged }) => {
  
  const [status, setStatus] = useState(statusesList[0])

  const handleChange = (event, newValue) => {
    setStatus(newValue)
    onStatusChanged(newValue)
  }

  return (
    <Autocomplete
      id="setStatus"
      options={statusesList}
      onChange={handleChange}
      value={status}
      getOptionLabel={(option) => option.label ?? status.label}
      openOnFocus
      clearOnEscape
      renderInput={(params) => (
        <TextField
          {...params}
          label="Priority"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {status ? status.icon : null}
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
    >

    </Autocomplete>
  )
}

export default Status