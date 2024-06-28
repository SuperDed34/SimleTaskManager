const Task = require('../models/task.model')

exports.addTask = async (req, res) => {
  try {
    const { title, createdDate, dueDate, priority, status, description } = req.body

    const task = new Task({ title, createdDate, dueDate, priority, status, description })
    await task.save();
    res.status(201).json({ message: 'Task was created and saved', task })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Task wasn\'t created, error: ' + error.message })
  }
}