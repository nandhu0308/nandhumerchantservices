var dateformat = require('dateformat');
var ApplicationUsers = require('./../userModels/applicationUsersModel');
var ApplicationsModules = require('./../../applications/applicationsModels/applicationsModulesModel');
var ApplicationsRoleModules = require('./../../applications/applicationsModels/applicationRoleModulesModel');
var ApplicationsRoleModel = require('./../../applications/applicationsModels/applicationsRolesModel');
var AssignedUserRoleModules = require('./../../applications/applicationsModels/assignedUserRoleModuleModel');
var UserSessions = require('./../userModels/userSessionModel');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../services/tokenValidator');


var getApplicationUserByClientId = function (req, res) {

    client_id = req.params.clientId;
    ApplicationUsers.findAll({
        where: {
            client_id: client_id,
            is_active: true
        },
        attributes: {
            exclude: ['created_by', 'updated_by', 'created_time', 'updated_time']
        }
    }).then(applicationUserList => {
        res.status(200).json(applicationUserList);
    }).catch(err => {
        res.status(500).json({
            error: err,
            message: 'Something went wrong!'
        })
    });

};

var superUserRolesUpdate = function (req, res) {
    reqObj = req.body;
    ApplicationsRoleModules.findOne({
        where: {
            role_id: reqObj.role_id,
            module_id:reqObj.module_id
        }
    }).then(rolesModules => {
        console.log(rolesModules.id);
        AssignedUserRoleModules.create({
            user_id: reqObj.user_id,
            role_module_id: rolesModules.id,
            is_active: true,
            created_by: reqObj.created_by,
            last_updated_by: reqObj.last_updated_by
        }).then(assignedRole => {
            res.status(200).json({
                id: assignedRole.id,
                message: 'success'
            });
        }).catch(function (err) {
            console.log(err);
        })
    }).catch(function (err) {
        res.status(500).json({
            errMessage: err,
            message: 'something went wrong...'
        });
    })
};


module.exports = {
    superUserRolesUpdate: superUserRolesUpdate,
    getApplicationUserByClientId: getApplicationUserByClientId
}