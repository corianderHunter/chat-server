const { json } = require('./response');
module.exports = {
    action(callback, res) {
        callback().catch(e => {
            console.error(e);
            json(res, '数据库相关错误！', {
                body: e,
                status: 400
            });
        });
    }
};
