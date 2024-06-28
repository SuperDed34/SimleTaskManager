const { Router } = require('express')
const { addTask } = require('../controllers/addTask.controller')
const router = Router()

router.post('/add-task', addTask)

module.exports = router