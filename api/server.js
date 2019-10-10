const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

const userRouter = require('../routes/users-route')

server.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Real Time Validation Server'
    })
})

server.use('/auth', userRouter)

module.exports = server