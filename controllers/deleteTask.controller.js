const Task = require('../models/task.model')

exports.deleteTask = async (req, res, next) => {
  try {
    const taskIds = req.body
    const result = await Task.deleteMany({ _id: { $in: taskIds } })

    res.status(200).json({ message: 'Tasks deleted successfully', deletedCount: result.deletedCount })
  } catch (error) {
    next(error)
  }
}