// note, io(<port>) will create a http server for you
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');

const { debounce } = require('underscore');

let connect = () => {
    let uri = `mongodb://${process.env.MONGO_USERNAME}:${
        process.env.MONGO_PASSWORD
    }@${process.env.MONGO_URI}`;
    let options = {
        dbName: process.env.MONGO_DATABASE
    };
    mongoose.connect(uri, options);
    return mongoose.connection;
};

let initSocketIO = () => {
    console.log('mongo connected!');
    require('require-all')(__dirname + '/Schema');
    console.log('starting socket.io! ');

    const app = express();
    const bodyParser = require('body-parser');
    const compression = require('compression');
    const routers = require('./router');
    const server = http.createServer(app).listen(process.env.PORT);
    const io = require('socket.io')(server);

    app.use(bodyParser.json());
    app.use(compression());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use(express.static(__dirname + '/static'));
    app.use(routers);

    const middlewares = require('./middlewares');
    const channels = require('./channels');
    io.on('connection', function(socket) {
        for (let pro in middlewares) {
            socket.use(middlewares[pro]);
        }

        for (let pro in channels) {
            socket.on(pro, channels[pro]);
        }

        socket.on('serverEvent', function(from, msg) {
            console.log('I received a private message by ', from);
        });
    });
};

connect()
    .on('error', console.log)
    .on('disconnected', debounce(connect, 3000))
    .once('open', initSocketIO);
