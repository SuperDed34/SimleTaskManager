const express = require('express')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/tasks', require('./routes/addTask.route'))
app.use('/api/getTasks', require('./routes/getTasks.route'))
app.use('/api/getTask', require('./routes/getTask.route'))
app.use('/api/editTask', require('./routes/changeTask.route'))
app.use('/api', require('./routes/deleteTask.route'))

app.use(errorHandler)

module.exports = app