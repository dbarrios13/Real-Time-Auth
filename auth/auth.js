const jwt = require('jsonwebtoken')

const jwtKey = require('./secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, jwtKey.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json(err)
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(401).json({
            message: 'No token provided'
        })
    }
}