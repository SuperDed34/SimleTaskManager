const Task = require('../models/task.model')

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId)
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json({ message: 'Task deleted successfully', deletedTask })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error: ' + error.message })
  }
}