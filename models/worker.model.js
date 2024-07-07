const { Schema, model } = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const workerSchema = new Schema({
  _id: {type: String, default: uuidv4},
  name: { type: String, required: true },
  position: { type: String, required: true },
  employmentDate: { type: String },
  employmentStatus: { type: String, required: true },
}, { timestamps: true })

module.exports = model('Worker', workerSchema)