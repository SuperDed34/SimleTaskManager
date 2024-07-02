const Task = require('../models/task.model')

exports.getTask = async (req, res, next) => {
  const taskId = req.params.id
  try {
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task);
  } catch (error) {
    next(error)
  }
}