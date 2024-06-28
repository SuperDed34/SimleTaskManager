const { Router } = require('express')
const { addTask } = require('../controllers/addTask.controller')
const {body} = require('express-validator')
const validate = require('../middleware/validate')
const router = Router()

router.post(
  '/add-task',
  validate([
    body('title').notEmpty().withMessage('Title is required'),
]), addTask)

module.exports = router