const db = require('../database/dbConfig')

module.exports = {
    add,
    findById,
    getUsernames,
    getEmails
}

function add (user) {
    return db('user')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids
            return findById([id])
        })
}

function findById (id) {
    return db('user')
        .where({id})
        .first()
}

function getUsernames () {
    return db('user')
        .select("username")
}

function getEmails () {
    return db('user')
        .select("email")
}