const { Router } = require('express')
const { changeTask } = require('../controllers/changeTask.controller')
const router = Router()

router.post('/edit-task/:id', changeTask)

module.exports = router