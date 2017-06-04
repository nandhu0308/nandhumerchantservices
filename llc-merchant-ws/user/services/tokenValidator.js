var UserSessions = require('./../userModels/userSessionModel');

var validateToken = function (user_id, token) {
    return UserSessions.findAll({
        where: {
            user_id: user_id,
            session_key: token,
            is_active: true
        }
    });
};

module.exports = {
    validateToken: validateToken
}