var express = require('express');
var productRouter = express.Router();

productRouter.route('/get').get(function(req, res){
    res.json({message: 'ok'});
});

module.exports = productRouter;