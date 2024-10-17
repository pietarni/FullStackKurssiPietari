const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'testing') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app