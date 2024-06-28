const { Router } = require('express')
const { getTasks } = require('../controllers/getTasks.controller')
const router = Router()

router.get('/get-tasks', getTasks)

module.exports = router