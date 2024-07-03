const Task = require('../models/task.model')

exports.deleteTask = async (req, res, next) => {
  try {
    const taskIds = req.body
    const result = await Task.deleteMany({ _id: { $in: taskIds } })

    res.status(200).json({ message: `${result.deletedCount} Task${result.deletedCount > 1 ? 's' : ''} deleted successfully`, deletedCount: result.deletedCount })
  } catch (error) {
    next(error)
  }
}