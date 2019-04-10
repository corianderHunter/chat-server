let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

let roomSchema = new Schema({
    roomName: String,
    info: String,
    leader: Schema.ObjectId,
    members: Array,
    createdAt: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
})

roomSchema.methods = {}

roomSchema.statics = {}

mongoose.model('Room', roomSchema)