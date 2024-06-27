const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000

app.use(express.json({extended: true}))
app.use('/api/tasks', require('./routes/addTask.route'))
app.use('/api/getTasks', require('./routes/getTask.route'))
app.use('/api', require('./routes/deleteTask.route'))

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.oxzkvis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    app.listen(PORT, () => {
      console.log('server started on port:' + PORT)
    })
  } catch (error) {
    console.error(error)
  }
}

start()