var Applications = require('./../applicationsModels/applcationsModel');

var newAplication = function(req, res){
    reqObj = req.body;
    Applications.create({
            application_name: reqObj.application_name,
            application_short_name: reqObj.application_short_name,
            description: reqObj.description,
            is_active: reqObj.is_active,
            created_by: reqObj.created_by,
            last_updated_by: reqObj.last_updated_by                        
    }).then(application => {
        res.status(200).json({
            application_id: application.id,
            message: 'success'
        });
    }).catch(function(err){
        res.status(500).json({
            message: 'Couldnt create application. Something went wrong...',
            err_description: err
        });
    });
};

module.exports = {
    newAplication: newAplication
}