const mongoose = require('mongoose');
const User = mongoose.model('User');
const Room = mongoose.model('Room');

module.exports.shareCode = data => {
    console.log(data);
};

module.exports.test = data => {
    console.log(typeof data);
    console.log(data, 'test');
};
