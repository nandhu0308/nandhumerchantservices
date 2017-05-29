var ApplicaionsModules = require('./../applicationsModels/applicationsModulesModel');

var newApplicationsModule = function (req, res) {
    reqObj = req.body;
    if (reqObj !== null) {
        ApplicaionsModules.create({
            application_id: reqObj.application_id,
            module_name: reqObj.module_name,
            module_title: reqObj.module_title,
            module_path: reqObj.module_path,
            load_children: reqObj.load_children,
            module_data: reqObj.module_data,
            data_icon: reqObj.data_icon,
            module_parentid: reqObj.module_parentid,
            disp_sequence: reqObj.disp_sequence,
            is_active: reqObj.is_active,
            is_read: reqObj.is_read,
            is_denied: reqObj.is_denied,
            created_by: reqObj.created_by,
            last_updated_by: reqObj.last_updated_by
        }).then(applicationsModules => {
            res.status(200).json({
                id: applicationsModules.id,
                message: 'success'
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                message: 'Creating Failed...'
            });
        });
    } else {
        res.status(500).json({
            message: 'No Request Body Found...'
        });
    }
};

module.exports = {
    newApplicationsModule: newApplicationsModule
}