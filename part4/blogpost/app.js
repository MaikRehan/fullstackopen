const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/conf')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require("./controllers/login");
const middleware = require('./utils/middleware')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app