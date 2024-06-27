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

export const changeTaskHandler = async (taskId, onUpdated, onLoading) => {
  
}

