import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import AddTaskIcon from '@mui/icons-material/AddTask'
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const Toolbar = ({clickHandler, mode}) => {
  return (
    <Grid
      container
      columns={3}
      sx={{
        mb: 1
      }}
    >
      <Grid item>
        <Stack direction={'row'} spacing={2}>
          <Button
          variant='contained'
          color='success'
          startIcon={<AddTaskIcon />}
          onClick={clickHandler}>
            Add task
          </Button>
          <Divider orientation='vertical' variant='middle' size='small' flexItem/>
          <Button
            variant='contained'
            color='primary'>
            {mode === 'main'
              ? <Link style={{textDecoration:'none', color:'inherit'}} to={'/completed'}>Show Completed</Link>
              : <Link style={{textDecoration:'none', color:'inherit'}} to={'/'}>Show Uncompleted</Link>}
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        
      </Grid>
      <Grid item>
        <Stack
          spacing={1}
          direction={'row'}>
        </Stack>
      </Grid>
    </Grid>
    )
}

export default Toolbar