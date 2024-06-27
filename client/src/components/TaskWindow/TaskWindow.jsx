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
import Status from '../Status/Status'
import { addTaskHandler, editTaskHandler } from '../../services/DBService'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
//Trought normalization priorities and statuses lists values should been taken from DB
const priorities = [
  { label: 'none', color: 'action' },
  { label: 'Low', color: 'green' },
  { label: 'Medium',color: 'yellow'},
  { label: 'High',color: 'orange'},
  { label: 'Critical',color: 'red'}
]

const statuses = [
  { label: 'Not started',color: 'white'},
  { label: 'Started',color: 'violet' },
  { label: 'Working',color: 'skyblue' },
  { label: 'Held', color: 'yellow' },
  { label: 'Complete', color: 'green'}
]

const TaskWindow = ({clickHandler, onUpdated, onLoading}) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
      title:  '',
      createdDate:'',
      dueDate: {},
      priority: priorities[0],
      status: statuses[0],
      description: ''
  })
  const [mode, setMode] = useState('')

  const handleClickOpen = (task = undefined, mode='new', id=undefined) => {
    setForm({
      id: id,
      title: task ? task.title : '',
      createdDate: task.createdDate ?? '',
      dueDate: task.dueDate ?? {},
      priority: task.priority ?? priorities[0],
      status: task.status ?? statuses[0],
      description: task.description ?? ''
    })
    mode === 'new' ? setMode('new') : setMode('change')
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

  const updateForm = (event) => {
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
      <DialogTitle>{mode === 'new' ? 'New Task' : `Change task : ${form.title}`}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            autoFocus
            value={form.title ?? ''}
            required
            margin='dense'
            id='taskTitle'
            name='title'
            label='Task Title'
            type='text'
            fullWidth
            variant='standard'
            size='small'
            onChange={updateForm}
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
              value={moment(form.dueDate, 'DD/MM/YYYY HH:mm') ?? {}}
              label='Choose End date'
              size='small'
              format='DD/MM/YYYY HH:mm'
              onChange={updateForm}
            />
            <Priorities
              required
              name='priority'
              value={form.priority}
              prioritiesList={priorities}
              onPriorityChanged={handlePriorityChange}
              onChange={updateForm}
               />
          </Stack>
          <Divider variant='inset' sx={{ height: 1 }} />
          <Status
            required
            name='status'
            value={form.status}
            statusesList={statuses}
            onStatusChanged={handleStatusChange}
            onChange={updateForm}
          />
          <Divider variant='inset' sx={{ height: 1 }} />
          <TextField
            id="description"
            label="Description"
            name='description'
            multiline
            rows={4}
            variant="filled"
            value={form.description}
            onChange={updateForm}
          />
        </Stack>
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose}>Cancel</Button>
        { mode ==='new'
          ? (<Button onClick={() => {
            addTaskHandler({ ...form, createdDate: moment().format('DD/MM/YYYY HH:mm') }, onUpdated, onLoading)
          }
          } type="submit">Add</Button>)
          : (<Button onClick={() => {
            editTaskHandler(form.id, form, onUpdated, onLoading)
          }
          } type="submit">Save</Button>)
        }
      </DialogActions>
    </Dialog>
    )
}

export default TaskWindow