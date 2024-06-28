const Task = require('../models/task.model')

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error: ' + error.message })
  }
};