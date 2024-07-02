import axios from 'axios'
import Grid from '@mui/material/Grid'
import Header from '../../components/Header/Header'
import TasksTable from '../../components/Table/Table'
import Toolbar from '../../components/Toolbar/Toolbar'
import TaskWindow from '../../components/TaskWindow/TaskWindow'
import { useCallback, useEffect, useState } from 'react'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import { v4 as uuidv4 } from 'uuid'

const TaskDashboard = ({mode}) => {
  const [clickHandler, setClickHandler] = useState(null)
  const [choosenCells, setChoosenCells] = useState([])
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [updated, setUpdated] = useState(false)
  const [snackbar, setSnackbar] = useState({open: false, text: '', severity: ''})

  useEffect(() => {
    setLoading(true)
    axios.get('/api/getTasks/get-tasks')
      .then((response) => {
      setTasks(response.data)
      setUpdated(false)
      })
      .catch((error) => {
        setSnackbar({open: true, text: `Here is problem:${error}`, severity:'error'})
        setLoading(false)
      })
    .finally(setLoading(false))

  }, [])

  const handleTaskWindowClick = (handler) => {
    setClickHandler(handler)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, text: '', severity: '' })
  } 

  const handleUpdate = useCallback((newTask, mode = 'add') => {
    let tasksArray = [...tasks]
    const index = tasksArray.findIndex(task => task._id === newTask._id)
    if (index !== -1 && mode !== 'delete') {
      tasksArray[index] = newTask
      setTasks([...tasksArray])
    } else if (mode === 'add') {
      newTask.id = uuidv4()
      tasksArray.push(newTask)
      setTasks([...tasksArray])
    } else if (mode === 'delete') {
      const tasksAfterDeletion = tasksArray.filter(item => !newTask.includes(item._id))
      setTasks([...tasksAfterDeletion])
    }
    setUpdated(true)
    setLoading(false)
  })

  return (
    <>            
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Header/>
      </Grid>
      <Grid item xs={11} sx={{ mx: 1 }}>
        <Toolbar
          clickHandler={clickHandler}
          handleUpdate={handleUpdate}
          onUpdated={setUpdated}
          onLoading={setLoading}
          setSnackbar={setSnackbar}
          choosenCells={choosenCells}
          mode={mode} />
        <TasksTable
          tasks={tasks}
          loading={loading}
          onUpdated={setUpdated}
          onEdit={clickHandler}
          setChosenCells={setChoosenCells}
          setSnackbar={setSnackbar}
          handleUpdate={handleUpdate}
          mode={mode}
        />
      </Grid>
      <TaskWindow
        clickHandler={handleTaskWindowClick}
        handleUpdate={handleUpdate}
        onUpdated={setUpdated}
        onLoading={setLoading}
        setSnackbar={setSnackbar}
        />
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        text={snackbar.text}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default TaskDashboard;
