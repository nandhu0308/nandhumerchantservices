// var haappyEvent = require('./../haappyEvent/haappyEventModel');

// var dateformat = require('dateformat');
// var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
// var TokenValidator = require('./../../user/services/tokenValidator');

// var getEvents = function (req, res) {

//     authToken = req.headers.authorization;
    
//         userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
//         var todayDate = new Date();
//         var expireDate = new Date(userAuthObj.expire_date);
//         tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) 
//         {
//             if (userSessions.length === 1) {
//                 if (expireDate >= todayDate) {

//                     HaappyEvent.findAll({
//                         where: {
//                             is_active: true
//                         }
//                     }
//                     ).then(function (broadcasterChannelCategory) {
//                         res.status(200).json(broadcasterChannelCategory);
//                     }).catch(function (err) {
//                         res.status(404).json({
//                             message: 'There are no events...'
//                         });
//                     });
//                 } else {
//                     res.status(401).json({
//                         message: 'Not Authorized...'
//                     });
//                 }
//             } else {
//                 res.status(401).json({
//                     message: 'Token Expired...'
//                 });
//             }
//         }).catch(function (err) {
//             res.status(401).json({
//                 message: 'Token Expired...'
//             });
//         });
//     };