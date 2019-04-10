const mongoose = require('mongoose')
const User = mongoose.model('User')
const Room = mongoose.model('Room')

module.exports.createUser = (socket) => {
    socket.on('createUser', (data) => {
        console.log(data)
    })
}

module.exports.updateAvatar = (socket) => {
    socket.on('updateAvatar', (data) => {

    })
}

module.exports.shareCode = (socket) => {
    socket.on('shareCode', (data) => {
        console.log(data)
    })
}