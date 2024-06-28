const Task = require('../models/task.model')

exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.id
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId)
    if (!deletedTask) {
      throw new Error('Internal Error in editing task, contact with administrator')
    }
    res.json({ message: 'Task deleted successfully', deletedTask })
  } catch (error) {
    next(error)
  }
}