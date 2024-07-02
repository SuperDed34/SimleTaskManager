const { Router } = require('express')
const { deleteTask } = require('../controllers/deleteTask.controller')
const router = Router()

router.post('/delete-task', deleteTask)

module.exports = router