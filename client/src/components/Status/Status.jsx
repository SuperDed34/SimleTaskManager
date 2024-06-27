import { Autocomplete, TextField, ListItem, ListItemIcon, ListItemText, InputAdornment } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle'
import { useEffect, useState } from "react"

const Status = ({ statusesList, onStatusChanged, value }) => {
  
  const [status, setStatus] = useState(statusesList[0])

  const handleChange = (event, newValue) => {
    setStatus(newValue)
    onStatusChanged(newValue)
  }

  useEffect(() => {
    if (value) {
      setStatus(value)
    }
  },[value])

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
          label="Priority"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {status ? <CircleIcon sx={{ color: status.color }}/> : null}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.label}>
          <ListItemIcon>{<CircleIcon sx={{ color: option.color }}/>}</ListItemIcon>
          <ListItemText primary={option.label} />
        </ListItem>
      )}
    >

    </Autocomplete>
  )
}

export default Status