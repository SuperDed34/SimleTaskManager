const { Schema, model} = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true },
  createdDate: { type: String, required: true },
  dueDate: { type: Object, required: false },
  priority: { type: Object, required: true }, 
  status: { type: Object, required: true },
  description: {type: String, required: false}
})
const Task = model('Task', schema)
module.exports = Task