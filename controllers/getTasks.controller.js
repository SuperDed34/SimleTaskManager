const Task = require('../models/task.model')

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
}