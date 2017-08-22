var googleapis = require('googleapis');
var ResumableUpload = require('node-youtube-resumable-upload');
// var dateformat = require('dateformat');
// var UserSessions = require('./../userModels/userSessionModel');
// var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
// var TokenValidator = require('./../services/tokenValidator');
var fs = require('fs');

//var OAuth2 = google.auth.OAuth2;

// var oauth2Client = new OAuth2(
//   "541496688190-77gis5difu9evgakkfetvi9igrij7223.apps.googleusercontent.com",
//   "ULrIXr09dxr72SANCCNKPcgU",
//   "http://localhost:3000/oauth2callback"
// );

// generate a url that asks permissions for Google+ and Google Calendar scopes
// var scopes = [
//   'https://www.googleapis.com/auth/plus.me',
//   'https://www.googleapis.com/auth/calendar'
// ];

// var url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',

//   // If you only need one scope you can pass it as a string
//   scope: scopes,

//   // Optional property that passes state parameters to redirect URI
//   // state: { foo: 'bar' }
// });

// oauth2Client.getToken(code, function (err, tokens) {
//   // Now tokens contains an access_token and an optional refresh_token. Save them.
//   if (!err) {
//     oauth2Client.setCredentials(tokens);
//   }
// });

// set auth as a global default
// google.options({
//   auth: oauth2Client
// });

// var getOauthToken = function (req, res) {
//   return res.send(req.params.authorizationCode);
// };




var uploadVideoInYoutube = function (req, res) {
    debugger;

    
    // var authClient = new googleapis.auth.JWT(
    //       'developer.limitlesscircle@gmail.com', 
    //       'youtube.pem',
    //       null,
    //    ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/youtube.upload'],
    //    null
    //  );

    var tokens = {
        access_token: "ya29.GluuBKKdHpZEB_6SF0Wlizn9NDb56PBER56sOaArwU-oUXDJz8Os8Jr_qQACYZdhHzkCTEolPa2aoxelBedgVfFIIZzZz34ZykGpxd0Xz7IpJMg3ticB1HOGS6B_",
        expiry_date: "Mon, 28 Dec 2017 00:00:00 GMT",
        token_type: "Bearer"
    };

     var metadata = {snippet: { title: 'title', description: 'Uploaded with ResumableUpload' },status: { privacyStatus: 'private' }};
      var resumableUpload = new ResumableUpload(); //create new ResumableUpload
      resumableUpload.tokens = tokens;
      resumableUpload.filepath = 'https://s3.ap-south-1.amazonaws.com/haappy-videos-asia/dry_fruits_salad.mp4';
      resumableUpload.metadata = metadata;
      resumableUpload.monitor = true;
    //   resumableUpload.eventEmitter.on('progress', function(progress) {
    //        console.log(progress);
    //   });
      resumableUpload.initUpload(function(result) {
          debugger;
           console.log(result);
           return;
      });

    // authClient.authorize(function(err, tokens) {
    //     if (err) {
    //        console.log(err);
    //        return;
    // }

    // });
               
};

module.exports = {
    uploadVideoInYoutube: uploadVideoInYoutube
};
