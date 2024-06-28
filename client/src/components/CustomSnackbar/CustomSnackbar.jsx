import { Snackbar, Alert, Slide } from "@mui/material"

const CustomSnackbar = ({open, text, severity, onClose}) => {

  return (
      <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
          <Alert
          onClose={onClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
      </Snackbar>
    )
}

export default CustomSnackbar