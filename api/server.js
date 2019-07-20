const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

const authRouter = require('../routes/auth_routes')

server.get('/', (res, req) => {
    res.json({
        message: 'Welcome to the Real Time Auth Server'
    })
})

server.use('/', authRouter)

module.exports = server