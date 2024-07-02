import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import AddTaskIcon from '@mui/icons-material/AddTask'
import DeleteIcon from '@mui/icons-material/Delete'
import { Badge, Divider, Fab } from '@mui/material'
import { Link } from 'react-router-dom'

import { deleteTaskHandler } from '../../services/DBService'

const Toolbar = ({clickHandler, mode, choosenCells, onUpdated, onLoading, setSnackbar, handleUpdate}) => {
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
          <Fab
            sx={{
              visibility: choosenCells.length !== 0 ? 'visible' : 'hidden',
              position: 'fixed',
              right: 40,
              bottom: 40
            }}
            color='error'
            onClick={() =>  deleteTaskHandler(choosenCells, onUpdated, onLoading, setSnackbar, handleUpdate)}>
            <Badge badgeContent={choosenCells.length} color='primary'>
              <DeleteIcon/>
            </Badge>
          </Fab>
        </Stack>
      </Grid>
    </Grid>
    )
}

export default Toolbar