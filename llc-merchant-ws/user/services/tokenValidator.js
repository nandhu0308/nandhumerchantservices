var UserSessions = require('./../userModels/userSessionModel');

var validateToken = function(user_id, token){
    UserSessions.findAll({
        user_id: user_id,
        session_key: token,
        is_active: true
    }).then(function(userSessions){
        if(userSessions.length === 1){
            return true;
        } else if(userSessions.length === 0){
            return false;
        } else if(userSessions.length >1){
            return false;
        }
    }).catch(function(err){
        console.log(err);
    });
};

module.exports = {
    validateToken: validateToken
}