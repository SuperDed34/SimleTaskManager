import axios from 'axios';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header/Header';
import TasksTable from '../../components/Table/Table';
import Toolbar from '../../components/Toolbar/Toolbar';
import TaskWindow from '../../components/TaskWindow/TaskWindow';
import { useEffect, useState } from 'react';
import { filterContent } from '../../services/DBService';

const TaskDashboard = ({mode}) => {
  const [clickHandler, setClickHandler] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [updated, setUpdated] = useState(false)
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/getTasks/get-tasks')
        setTasks(mode === 'main' ? filterContent(response.data) : filterContent(response.data, 'Complete' ,'include'))
        setLoading(false)
        setUpdated(false)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        setLoading(false)
      }
    }
    fetchTasks()
    
  }, [updated, mode])

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
        <Header/>
      </Grid>
      <Grid item xs={11} sx={{ mx: 1 }}>
        <Toolbar clickHandler={clickHandler} mode={mode} />
        <TasksTable
          tasks={tasks}
          loading={loading}
          onLoading={setLoading}
          onUpdated={setUpdated}
          onEdit={clickHandler} />
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
