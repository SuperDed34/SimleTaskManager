import axios from "axios"
  
export const addTaskHandler = async (task, onLoading, setSnackbar, handleUpdate) => { 
  try {
    onLoading(true)
    await axios.post('/api/tasks/add-task', task, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setSnackbar({open: true, text: 'Task successfully added', severity: 'success'})
      handleUpdate(response.data.task)
    })   
  } catch (error) {
    console.log(error)
    setSnackbar({open: true, text: `Error while add a task: ${error.response ? (error.response.data.errors[0].msg ?? error.response.data.message) : ''}`, severity: 'error'})
    onLoading(false)
    throw error
  }
}

export const deleteTaskHandler = async (taskIds, onLoading, setSnackbar, handleUpdate) => {
  onLoading(true)
  try {
    await axios.post('/api/delete-task', taskIds, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      onLoading(false)
      setSnackbar({ open: true, text: 'Task successfully removed', severity: 'success' })
      handleUpdate(taskIds, 'delete')
    })

  } catch (error) {
    setSnackbar({ open: true, text: `Error deleting task: ${error}`, severity: 'error' })
    throw error
  }
}

export const getTask = async (taskId, setSnackbar) => {
  try {
    const response = await axios.get(`/api/getTask/get-task/${taskId}`)
    return response.data
  } catch (error) {
    setSnackbar({open: true, text: `Error while get a task: ${error.response.data.message}`, severity: 'error'})
    throw error
  }
}

export const editTaskHandler = async (taskId, updatedData, onLoading, setSnackbar, handleUpdate) => {
  onLoading(true)
  try {
    await axios.post(`/api/editTask/edit-task/${taskId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setSnackbar({open: true, text: 'Task successfully edited', severity: 'success'})
      handleUpdate(response.data, 'change')
    })

  } catch (error) {
    onLoading(false)
    setSnackbar({open: true, text: `${error}`, severity: 'error'})
    console.error(error)
  }
}

export const filterContent = (response, filterCriteria = 'Complete', mode = 'exclude') => {
  let res = []
  response.map(item => {
    const modes = {
    exclude: item.status.label !== filterCriteria,
    include: item.status.label === filterCriteria
    }
    if (modes[mode]) {
      res.push(item)
      return item
    }
  })
  return res
}