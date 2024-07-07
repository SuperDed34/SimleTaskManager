const { Router } = require('express')
const { getWorkers } = require('../controllers/getWorkers.controller')
const router = Router()

router.get('/get-workers', getWorkers)

module.exports = router