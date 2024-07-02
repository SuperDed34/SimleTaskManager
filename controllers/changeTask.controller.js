 const Task = require('../models/task.model');

exports.changeTask = async (req, res, next) => {
  const taskId = req.params.id
  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true })
    if (!task) {
      throw new Error(`Internal Error in editing task, contact with administrator`)
    }
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}