const Worker = require('../models/worker.model')

exports.getWorker = async (req, res, next) => {
  console.log(req.params.id)
  const workerId = req.params.id
  try {
    const worker = await Worker.findById(workerId)
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' })
    }
    res.json(worker)
  } catch (error) {
    next(error)
  }
}