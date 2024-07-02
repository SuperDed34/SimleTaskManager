const mongoose = require('mongoose')
const app = require('./app')


async function start() {
  try {
    const dbURI = `${process.env.URL}`
    await mongoose.connect(dbURI);

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    });
  } catch (error) {
    console.error('Error starting server:', error.message)
    process.exit(1)
  }
}

start()