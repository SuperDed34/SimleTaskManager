import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import AddTaskIcon from '@mui/icons-material/AddTask'

const Toolbar = ({clickHandler}) => {
  return (
    <Grid
      container
      columns={3}
      sx={{
        mb: 1
      }}
    >
      <Grid item>
        <Button
          variant='contained'
          color='success'
          startIcon={<AddTaskIcon />}
          onClick={clickHandler}>
            Add task
        </Button>
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