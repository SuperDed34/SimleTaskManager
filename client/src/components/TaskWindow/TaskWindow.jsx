import { useState, useEffect, forwardRef } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Slide
} from '@mui/material'
import { DateTimePicker} from '@mui/x-date-pickers'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import moment from 'moment'
import 'moment/locale/en-gb'
import Priorities from '../Priorities/Priorities'
import Status from '../Status/Status'
import { addTaskHandler, editTaskHandler } from '../../services/DBService'
import Responsible from '../Table/Responsible/Responsible';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const priorities = [
  { label: 'none', color: 'action' },
  { label: 'Low', color: 'green' },
  { label: 'Medium', color: 'yellow' },
  { label: 'High', color: 'orange' },
  { label: 'Critical', color: 'red' }
]

const statuses = [
  { label: 'Not started', color: 'white' },
  { label: 'Started', color: 'violet' },
  { label: 'Working', color: 'skyblue' },
  { label: 'Held', color: 'yellow' },
  { label: 'Complete', color: 'green' }
]

const TaskWindow = ({ clickHandler, onLoading, setSnackbar, handleUpdate, workers }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    createdDate: '',
    dueDate: {},
    priority: priorities[0],
    status: statuses[0],
    description: ''
  })
  const [mode, setMode] = useState('new')

  const handleClickOpen = (task = {}, mode = 'new', id) => {
    setForm({
      id: id || '',
      title: task.title || '',
      createdDate: task.createdDate || '',
      dueDate: task.dueDate || '',
      responsibleWorkers: workers.find(worker => worker._id === task.responsibleWorkers) ? workers.find(worker => worker._id === task.responsibleWorkers)._id : 'Unasigned',
      priority: task.priority || priorities[0],
      status: task.status || statuses[0],
      description: task.description || ''
    })
    setMode(mode)
    setOpen(true)
  }

  const handleInitialValueForClock = () => {
    form.dueDate === ''
      ? setForm({ ...form, dueDate: moment().set({ hour: 23, minute: 59 }).format('DD/MM/YYYY HH:mm') })
      : null
  }

  const handleClickClose = () => setOpen(false)

  const handlePriorityChange = (newPriority) => setForm({ ...form, priority: newPriority })
  
  const handleStatusChange = (newStatus) => setForm({ ...form, status: newStatus })

  const updateForm = (event) => {
    const { name, value } = event.target || {}
    setForm({
      ...form,
      [name || 'dueDate']: value || (name === undefined ? moment(event).format('DD/MM/YYYY HH:mm') : '')
    })
  }

  useEffect(() => {
    clickHandler(() => handleClickOpen)
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      TransitionComponent={Transition}
      fullWidth
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {mode === 'new' ? 'New Task' : `Change task: ${form.title}`}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            required
            autoFocus
            value={form.title}
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
            direction='row'
            alignItems="stretch"
            justifyContent='space-between'
          >
            <DateTimePicker
              id='datePicker'
              name='dueDate'
              value={moment(form.dueDate, 'DD/MM/YYYY HH:mm')}
              label='Choose End date'
              format='DD/MM/YYYY HH:mm'
              ampm={false}
              onChange={updateForm}
              onOpen={handleInitialValueForClock}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
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
          <Responsible
            value={form.responsibleWorkers}
            onChange={updateForm}
            workers={workers} />
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
        {mode === 'new' ? (
          <Button
            onClick={() => {
              addTaskHandler(
                { ...form, createdDate: moment().format('DD/MM/YYYY HH:mm') },
                onLoading,
                setSnackbar,
                handleUpdate
              )
              setOpen(false)
            }}
          >
            Add
          </Button>
        ) : (
          <Button
              onClick={() => {
                editTaskHandler(form.id, form, onLoading, setSnackbar, handleUpdate)
                setOpen(false)
            }}
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default TaskWindow
