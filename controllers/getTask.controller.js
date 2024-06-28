const Task = require('../models/task.model')

exports.getTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error: ' + error.message })
  }
};