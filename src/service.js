const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    frindInfo(_id) {
        const selects = ['_id', 'name', 'avatar', 'oneWord', 'info'];
        return User.findById(_id, selects.join(' '));
    },
    async friendList(_id) {
        const selects = ['_id', 'name', 'avatar'];
        const { friends } = await User.findById(_id, 'friends');
        console.log(friends)
        return await friends.map(
            async id => await User.findById(id, selects.join(' '))
        );
    }
};
