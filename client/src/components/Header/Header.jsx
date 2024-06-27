import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InsertChartIcon from '@mui/icons-material/InsertChart'

import { colors } from '../colors'

const Header = () => {


  return (
    <Box>
      <AppBar
        position='static'
        sx={{
          backgroundColor: colors.componentBg,
        }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='logo'
            sx={{ mr: 2 }}>
            <InsertChartIcon/>
          </IconButton>
          <Typography
            variant='h6'
            component={'div'}
            sx={{ flexGrow: 1, cursor: 'default' }}>
              Simple Tasks Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    ) 
}

export default Header