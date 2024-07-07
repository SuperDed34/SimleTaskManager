const { Router } = require('express')
const { getWorker } = require('../controllers/getWorker.controller')
const router = Router()

router.get('/get-worker/:id', getWorker)

module.exports = router