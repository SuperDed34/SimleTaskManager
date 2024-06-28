const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error'

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      msg: 'Validation Error',
      details: err.errors
    })
  }
  if (err.name === 'CastError') {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      msg: `Task isn't exist`,
      details: err.errors
    })
  }

  if (err.message === 'Title must been filled') {
      return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: err.message,
      details: err.errors
    })
  }
  
   if (err.message === 'Internal Error in editing task, contact with administrator') {
      return res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: err.message,
      details: err.errors
    })
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}

module.exports = errorHandler
