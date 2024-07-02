import { Autocomplete, TextField, ListItem, ListItemIcon, ListItemText, InputAdornment } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle'
import { useEffect, useState } from "react"
import moment from "moment"

const Status = ({ statusesList, onStatusChanged, value }) => {
  const [status, setStatus] = useState(statusesList[0])

  useEffect(() => {
    if (value === null) {
      setStatus(statusesList[0]);
    } else if (value && value !== status) {
      setStatus(value);
    }
  }, [value, status])

  const handleChange = (event, newValue) => {
    newValue = newValue
      ? newValue.label !== 'Complete'
        ? { ...newValue }
        : { ...newValue, completeDate: moment().format('DD/MM/YYYY HH:mm') }
      : statusesList[0]
    setStatus(newValue)
    onStatusChanged(newValue)
  }

  return (
    <Autocomplete
      id="setStatus"
      options={statusesList}
      onChange={handleChange}
      value={status !== null ? status : statusesList[0]}
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
                {<CircleIcon sx={{ color: status==null? 'white' : status.color}}/>}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.label}>
          <ListItemIcon>
            <CircleIcon sx={{ color: option.color==null?'white':option.color }} />
          </ListItemIcon>
          <ListItemText primary={option.label} />
        </ListItem>
      )}
    />
  )
}

export default Status
