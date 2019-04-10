const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { mongooseAction } = require('./utils/response');
const { json } = require('./utils/response');

const User = mongoose.model('User');

router.get('*', (req, res, next) => {
    next();
});

router.get('/test', (req, res, next) => {
    res.send('test success!');
});

router.get('/register', (req, res, next) => {
    let { name } = req.params;
    mongooseAction(async () => {
        const user = await User.findOne({ name });
        if (user)
            return json(res, {
                message: 'user exists',
                data: {
                    user
                }
            });
        await new User({ name }).save().then(user => {
            json(res, {
                message: 'user created',
                data: {
                    user
                }
            });
        });
    }, res);
});

router.get('/profile', (req, res, next) => {
    let { _id } = req.params;
    mongooseAction;
});

module.exports = router;
