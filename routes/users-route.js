const route = require('express').Router()
const userDB = require('../models/users-model')
const jwt = require('jsonwebtoken')
const secret = require('../auth/secrets')
const bcrypt = require('bcryptjs')

route.get('/usernames', async (req, res) => {
    try {
        const usernames = await userDB.getUsernames()
        res.status(200).json({usernames})
    } catch ({ message }) {
        res.status(500).json({ message })
    }
})

route.get('/emails', async (req, res) => {
    try {
        let {email} = req.params
        const checkEmail = await userDB.findByEmail(email)
        console.log(email)
        console.log(checkEmail)
        if(checkEmail.length > 0) {
            res.status(200).json({
                message: 'Email is already associated with an account',
                email: true
            })
        } else {
            res.status(200).json({
                message: 'Valid e-mail',
                email: false
            })
        }
    } catch ({message}) {
        res.status(500).json({message})
    }
})

route.post('/signup', async (req, res) => {
    try {
        let user = req.body
        const hash = bcrypt.hashSync(user.password, 14)
        user.password = hash
        const bcryptUser = await userDB.add(user)
        res.status(201).json(bcryptUser)
    } catch ({message}) {
        res.status(500).json({message})
    }
})

route.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body
        const user = await userDB.findByUsername(username)
        console.log(user[0].password)
        if (user.length > 0) {
            if(bcrypt.compareSync(password, user[0].password)) {
                const token = generateToken(user)
                res.status(200).json({
                    token,
                    user
                })
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                })
            }
        }
    } catch ({ message }) {
        res.status(500).json({
            message
        })
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '5m'
    }

    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = route