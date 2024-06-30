import axios from "axios"
  
export const addTaskHandler = async (task, onUpdated, onLoading, setSnackbar) => {  
  try {
    onLoading(true)
    await axios.post('/api/tasks/add-task', task, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setSnackbar({open: true, text: 'Task successfully added', severity: 'success'})
      onUpdated(true)
    })   
  } catch (error) {
    setSnackbar({open: true, text: `Error while add a task: ${error.response.data.errors[0].msg ?? error.response.data.message}`, severity: 'error'})
    onLoading(false)
    throw error
  }
}

export const deleteTaskHandler = async (taskId, onUpdated, onLoading, setSnackbar) => {
  try {
    const response = await axios.delete(`/api/delete-task/${taskId}`)
    onUpdated(true)
    onLoading(true)
    setSnackbar({open: true, text: 'Task successfully removed', severity: 'success'})
    return response.data
  } catch (error) {
    setSnackbar({open: true, text: `Error deleting task: ${error}`, severity: 'error'})
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

export const editTaskHandler = async (taskId, updatedData, onUpdated, onLoading, setSnackbar) => {
  onLoading(true)
  try {
    const response = await axios.post(`/api/editTask/edit-task/${taskId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setSnackbar({open: true, text: 'Task successfully edited', severity: 'success'})
      onUpdated(true)
    })

  } catch (error) {
    onLoading(false)
    setSnackbar({open: true, text: `${error.response.data.message}`, severity: 'error'})
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