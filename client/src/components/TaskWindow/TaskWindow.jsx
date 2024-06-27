import { useState, useEffect, forwardRef } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { Slide } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import 'moment/locale/en-gb';
import Priorities from '../Priorities/Priorities'

import WhatshotIcon from '@mui/icons-material/Whatshot';
import CircleIcon from '@mui/icons-material/Circle';
import Status from '../Status/Status'
import { addTaskHandler } from '../../services/DBService'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const priorities = [
  { label: 'none', icon: <WhatshotIcon color='action'/> },
  { label: 'Low', icon: <WhatshotIcon sx={{color: 'green'}}/> },
  { label: 'Medium', icon: <WhatshotIcon sx={{color: 'yellow'}}/>  },
  { label: 'High', icon: <WhatshotIcon sx={{color: 'orange'}}/>  },
  { label: 'Critical', icon: <WhatshotIcon sx={{color: 'red'}}/>  }
]

const statuses = [
  { label: 'Not started', icon: <CircleIcon sx={{ color: 'white' }}/> },
  { label: 'Started', icon: <CircleIcon sx={{ color: 'violet' }} /> },
  { label: 'Working', icon: <CircleIcon sx={{ color: 'skyblue' }} /> },
  { label: 'Held', icon: <CircleIcon sx={{ color: 'yellow' }} /> },
  { label: 'Complete', icon: <CircleIcon sx={{color: 'green'}}/>}
]

const TaskWindow = ({clickHandler, onUpdated, onLoading}) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState()

  const handleClickOpen = () => {
    setForm({
      title: '',
      createdDate: '',
      dueDate: '',
      priority: priorities[0],
      status: statuses[0],
      description:''
      })
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
  }

  const handlePriorityChange = (newPriority) => {
    setForm({ ...form, priority: newPriority })
  }

  const handleStatusChange = (newStatus) => {
    setForm({...form, status: newStatus})
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target
        ? event.target.name
        : 'dueDate']: event.target
          ? event.target.value
          : moment(event._d).format('DD/MM/YYYY HH:mm')
    })
  }
  useEffect(() => {
    clickHandler(()=>handleClickOpen)
  }, [])
  

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      TransitionComponent={Transition}
      fullWidth
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          handleClickClose()
        },
      }}
    >
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            autoFocus
            required
            margin='dense'
            id='taskTitle'
            name='title'
            label='Task Title'
            type='text'
            fullWidth
            variant='standard'
            size='small'
            onChange={handleChange}
          />
          <Divider variant='inset' sx={{ height: 1 }} />
          <Stack
            spacing={2}
            direction={'row'}
            alignItems="stretch"
            justifyContent={'space-between'}>
            <DateTimePicker
                id='datePicker'
                name='dueDate'
                label='Choose End date'
                size='small'
                format='DD/MM/YYYY HH:mm'
                onChange={handleChange}
            />
            <Priorities
              required
              name='priority'
              prioritiesList={priorities}
              onPriorityChanged={handlePriorityChange}
              onChange={handleChange}
               />
          </Stack>
          <Divider variant='inset' sx={{ height: 1 }} />
          <Status
            required
            name='status'
            statusesList={statuses}
            onStatusChanged={handleStatusChange}
            onChange={handleChange}
          />
          <Divider variant='inset' sx={{ height: 1 }} />
          <TextField
            id="description"
            label="Description"
            name='description'
            multiline
            rows={4}
            variant="filled"
            onChange={handleChange}
          />
        </Stack>
        </DialogContent>
      <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
        <Button onClick={() => addTaskHandler({ ...form, createdDate: moment().format('DD/MM/YYYY HH:mm')}, onUpdated, onLoading)}type="submit">Add</Button>
      </DialogActions>
    </Dialog>
    )
}

export default TaskWindow