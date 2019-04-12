const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { action: mongooseAction } = require('./utils/mongoose');
const { json, BAD_REQUEST, UNAUTHORIZED } = require('./utils/response');
const { friendList } = require('./service');

const User = mongoose.model('User');

router.get('*', (req, res, next) => {
    next();
});

router.get('/test', (req, res, next) => {
    res.send('test success!');
});

router.get('/register', (req, res, next) => {
    let { name } = req.query;
    if (!name) return json(res, BAD_REQUEST);
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
    let { _id } = req.query;
    mongooseAction(async () => {
        const user = await User.findById(_id);
        if (!user) return json(res, UNAUTHORIZED);
        json(res, {
            message: '验证成功',
            data: { user }
        });
    }, res);
});

router.route('/:_id/friend')
    .put((req, res) => {
        let { _id } = req.params;
        let { friendId } = req.body;
        mongooseAction(async () => {
            const { friends } = await User.findById(_id, 'friends');
            if (friends.includes(friendId))
                return json(res, '已是您的好友，请勿添加', { status: 400 });
            friends.push(friendId);
            await User.findByIdAndUpdate(_id, { friends });
            json(res, {
                message: '添加成功！',
                data: {}
            });
        });
    })
    .get((req, res) => {
        let { _id } = req.params;
        mongooseAction(async () => {
            const friends = await friendList(_id);
            console.log(friends)
        }, res)
    });

router.route('/friend');

module.exports = router;
