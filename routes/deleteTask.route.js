const { Router } = require('express')
const router = Router()
const Task = require('../models/Tasks')

router.delete('/delete-task/:id', async (req, res) => {
  const taskId = req.params.id
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId)
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully', deletedTask })

  } catch (error) {
    res.status(500).json({message: 'Internar server error while deleting'})
  }
})

module.exports = router;