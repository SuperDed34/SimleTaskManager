import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { colors } from '../colors';

const Header = () => {
  return (
    <AppBar
      position='static'
      sx={{ backgroundColor: colors.componentBg }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='logo'
          sx={{ mr: 2 }}
        >
          <InsertChartIcon />
        </IconButton>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1, cursor: 'default' }}
        >
          Simple Tasks Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;