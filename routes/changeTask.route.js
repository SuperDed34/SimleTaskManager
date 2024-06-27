const { Router } = require('express')
const router = Router()
const Task = require('../models/Tasks')

router.post('/edit-task/:id', async (req, res) => {
  const taskId = req.params.id
    try {
      const task = await Task.findByIdAndUpdate(taskId, req.body)
      if (!task) {
        return res.status(404).json({ message: `Task ${taskId} not found`})
      }
      res.status(203).json(task)
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message})
    }
})

module.exports = router