const Task = require('../models/task.model')

const dateTimeFormatRegex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4} ([0-1][0-9]|2[0-3]):([0-5][0-9])$/

exports.addTask = async (req, res, next) => {
  try {
    const { title, createdDate, dueDate, priority, status, description } = req.body

    if (title.length === 0 || title === null || title === undefined) {
      throw new Error('Title must been filled')
    }

    if (
      typeof title !== 'string'
      || typeof createdDate !== 'string'
      || typeof description !== 'string'
      || (!(dueDate instanceof Object) && typeof dueDate !== 'string')
    ) {
        throw new TypeError('Title, created date, due date and description must be a string')
    }

    if ((
      !(priority instanceof Object)
      || !(status instanceof Object))
      ) {
      throw new TypeError('Status and priotiry must be an object')
    } else if (Object.keys(priority).length !== 2
      || Object.keys(status).length < 2) {
      throw new RangeError('Status and priority must have only 2 params {label: string and color: a string color representation}')
    }

    if (!(dueDate instanceof Object) && !dateTimeFormatRegex.test(dueDate)) {
      throw new TypeError('Due date must be a string in format DD/MM/YYYY HH:ss') 
    } 

    console.log(typeof dueDate)
  

    const task = new Task({ title, createdDate, dueDate, priority, status, description })
    await task.save();
    res.status(201).json({ message: 'Task was created and saved', task })
  } catch (error) {
    next(error)
  }
}