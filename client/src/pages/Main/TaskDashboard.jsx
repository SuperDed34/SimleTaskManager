import axios from 'axios';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header/Header';
import TasksTable from '../../components/Table/Table';
import Toolbar from '../../components/Toolbar/Toolbar';
import TaskWindow from '../../components/TaskWindow/TaskWindow';
import { useEffect, useState } from 'react';
import { filterContent } from '../../services/DBService';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';

const TaskDashboard = ({mode}) => {
  const [clickHandler, setClickHandler] = useState(null)
  const [choosenCells, setChoosenCells] = useState([])
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [updated, setUpdated] = useState(false)
  const [snackbar, setSnackbar] = useState({open: false, text: '', severity: ''})

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/getTasks/get-tasks')
        setTasks(mode === 'main' ? filterContent(response.data) : filterContent(response.data, 'Complete' ,'include'))
        setLoading(false)
        setUpdated(false)
      } catch (error) {
        setSnackbar({open: true, text: `Here is problem:${error}`, severity:'error'})
        setLoading(false)
      }
    }
    fetchTasks()
    
  }, [updated, mode])

  const handleTaskWindowClick = (handler) => {
    setClickHandler(handler)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, text: '', severity: '' })
  } 

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
            mode={mode}
          />
      </Grid>
      <TaskWindow
        clickHandler={handleTaskWindowClick}
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
