 const Task = require('../models/task.model');

exports.changeTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true })
    if (!task) {
      return res.status(404).json({ message: `Task ${taskId} not found` })
    }
    res.status(200).json(task)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error: ' + error.message })
  }
}