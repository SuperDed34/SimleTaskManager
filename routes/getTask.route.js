const { Router } = require('express')
const router = Router()
const Task = require('../models/Tasks')

router.get('/get-tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message})
  }
})

module.exports = router