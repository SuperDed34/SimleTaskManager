const { Router } = require('express')
const router = Router()
const Task = require('../models/Tasks')

router.get('/get-task/:id', async (req, res) => {
  const taskId = req.params.id
  try {
    const task = await Task.findById(taskId)
    if (!task) {
      return res.status(404).json({ message: "Task not found"})
    }
    res.json(task)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message})
  }
})

module.exports = router