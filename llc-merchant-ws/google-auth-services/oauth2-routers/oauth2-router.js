var express = require('express');
var oauth2Router = express.Router();

var Oauth2Generator = require('./../oauth2-services/oauth2-generator');

oauth2Router.route('/generate').get(Oauth2Generator.newOauth2Generate);
oauth2Router.route('/oauthcallback').get(Oauth2Generator.getOauthToken);

module.exports = oauth2Router;