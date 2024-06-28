import axios from "axios"
  
export const addTaskHandler = async (task, onUpdated, onLoading) => {
  try {
    onLoading(true)
    await axios.post('/api/tasks/add-task', task, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response=>onUpdated(true))   
  } catch (error) {
    console.log(error)
  }
}


export const deleteTaskHandler = async (taskId, onUpdated, onLoading) => {
  try {
    const response = await axios.delete(`/api/delete-task/${taskId}`)
    onUpdated(true)
    onLoading(true)
    return response.data
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export const getTask = async (taskId) => {
  try {
    const response = await axios.get(`/api/getTask/get-task/${taskId}`)
    return response.data
  } catch (error) {
    console.error('Error getting task:', error)
    throw error
  }
}

export const editTaskHandler = async (taskId, updatedData, onUpdated, onLoading) => {
  onLoading(true)
  try {
    const response = await axios.post(`/api/editTask/edit-task/${taskId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      onUpdated(true)
    })

    if (!response) {
      console.log('no res ' + response)
      return
    }
    
    console.log('Task updated:', response)

  } catch (error) {
    onLoading(false)
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