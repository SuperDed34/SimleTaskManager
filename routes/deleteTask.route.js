const { Router } = require('express')
const { deleteTask } = require('../controllers/deleteTask.controller')
const router = Router()

router.delete('/delete-task/:id', deleteTask)

module.exports = router