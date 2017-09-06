var express=require('express');
var templateRouter=express.Router();

var templateController=require('./../../notificationTemplate/templateControllers/templateController');

templateRouter.route('/template/get/:id').get(templateController.getTemplateController);
templateRouter.route('/log/get/:id').get(templateController.getLogController);
templateRouter.route('/streaming/mail/:id').post(templateController.sendStreamingTemplate);
templateRouter.route('/startbroadcasting/mail/:id/:img_id/:b_id').post(templateController.startBroadcasting);
templateRouter.route('/stopbroadcasting/mail/:id/:img_id/:b_id').post(templateController.stopBroadcasting);

module.exports = templateRouter;