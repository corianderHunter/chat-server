let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

let userSchema = new Schema({
    name: String,
    avatar: String,
    lvl: Number,
    experience: Number,
    oneWord: String,
    info: String,
    friends: Array,
    createdAt: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
});

userSchema.methods = {};

userSchema.statics = {};

mongoose.model('User', userSchema);
