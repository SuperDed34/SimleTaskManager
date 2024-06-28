const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  title: { type: String, required: true },
  createdDate: { type: Object, required: true },
  dueDate: { type: Object },
  completeDate: {type: Object},
  priority: { type: Object, required: true },
  status: { type: Object, required: true },
  description: { type: String }
}, { timestamps: true })

module.exports = model('Task', taskSchema)