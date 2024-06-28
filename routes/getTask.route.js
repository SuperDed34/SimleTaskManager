const { Router } = require('express')
const { getTask } = require('../controllers/getTask.controller')
const router = Router()

router.get('/get-task/:id', getTask)

module.exports = router