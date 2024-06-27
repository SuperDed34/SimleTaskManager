import { Stack, Paper, Typography } from "@mui/material"
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import { Link } from "react-router-dom"

const ErrorPage = () => {

  return (
    <Stack spacing={2}>
      <Paper elevation={3} square sx={{ p: 1, textAlign:'center'}}>
        <ReportTwoToneIcon sx={{ color: 'red', fontSize: '50vh', ta: 'center' }} />
        <Typography variant='h1' component='h1'>
          An Error occured
        </Typography>
        <Link style={{color: 'white'}} to={'/'}>Return Home</Link>
      </Paper>
    </Stack>
    )
}

export default ErrorPage