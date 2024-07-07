const { Schema, model } = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const taskSchema = new Schema({
  _id: {type: String, default: uuidv4},
  title: { type: String, required: true },
  createdDate: { type: Object, required: true },
  dueDate: { type: Object },
  priority: { type: Object, required: true },
  responsibleWorkers: {type: String},
  status: { type: Object, required: true },
  description: { type: String },
}, { timestamps: true })

module.exports = model('Task', taskSchema)