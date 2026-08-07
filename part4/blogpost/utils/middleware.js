const User = require("../models/user");
const jwt = require("jsonwebtoken");


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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    if (!user) {
        request.user = null
        return response.status(400).json({ error: 'no user in database' })
    }
    request.user = user

    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}