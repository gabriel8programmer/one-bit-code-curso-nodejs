
const bcrypt = require("bcrypt")
const uuid = require("uuid").v4

const users = [
    { id: "1", name: "Gabriel", email: "gabriel@gmail.com", password: "$2a$10$tJUK67OyhOdss6tl0VjsEOh.yFleaD9OQo5KvWz6RAyiDf2GC9BCS" }
]

module.exports = {

    getUsers: () => users,

    getUserById: (id) => users.find(user => user.id === id),

    getUserByEmail: (email) => users.find(user => user.email === email),

    createUser: ({ name, email, password }) => {
        const user = {
            id: uuid(),
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        }
        users.push(user)
        return user
    }
}