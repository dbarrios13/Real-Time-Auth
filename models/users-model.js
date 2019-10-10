const db = require('../database/dbConfig')

module.exports = {
    add,
    findByUsername,
    findByEmail,
    findById
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

function findByUsername (item) {
    return db('user')
        .where({username: item})
        // .first()
}

function findByEmail (item) {
    return db('user')
        .where({email: item})
        // .first()
}