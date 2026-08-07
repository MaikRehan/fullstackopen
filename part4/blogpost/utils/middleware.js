const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch (error) {
        return next(error)
    }

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        request.user = null
        return response.status(400).json({ error: 'no user in database' })
    }
    request.user = user

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}