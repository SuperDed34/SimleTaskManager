import axios from 'axios';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header/Header';
import TasksTable from '../../components/Table/Table';
import Toolbar from '../../components/Toolbar/Toolbar';
import TaskWindow from '../../components/TaskWindow/TaskWindow';
import { useEffect, useState } from 'react';

const TaskDashboard = () => {
  const [clickHandler, setClickHandler] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [updated, setUpdated] = useState(false)
  console.log(updated, loading)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/getTasks/get-tasks')
        setTasks(response.data)
        setLoading(false)
        setUpdated(false)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setLoading(false)
      }
    }
    fetchTasks()
    
  }, [updated])

  const handleTaskWindowClick = (handler) => {
    setClickHandler(handler)
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={11} sx={{ mx: 1 }}>
        <Toolbar clickHandler={clickHandler} />
        <TasksTable
          tasks={tasks}
          loading={loading}
          onLoading={setLoading}
          onUpdated={setUpdated} />
      </Grid>
      <TaskWindow
        clickHandler={handleTaskWindowClick}
        onUpdated={setUpdated}
        onLoading={setLoading}
        />
    </Grid>
  );
};

export default TaskDashboard;
