var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var newOauth2Generate = function (req, res) {
    console.log('reached generator');
    var oauth2Client = new OAuth2(
        '541496688190-jhr9qihabs0c6p816n8sci1ome3pifmk.apps.googleusercontent.com',
        'IiXqcIBdNuPA_KbxKIyMX4rp',
        'http://localhost:3000/oauth2/oauthcallback'
    );

    var scopes = [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtubepartner-channel-audit'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    console.log(url);
};

var getOauthToken = function(req, res){
    var code = req.query.code;
    console.log('code: '+ code);
    oauth2Client.getToken(code, function(err, token){
        if(err){
            console.log(err);
            res.status(404).json({
                error: err
            });
        } else {
            console.log(token);
            res.status(200).json({
                tokens: token
            });
        }
    });
};

module.exports = {
    newOauth2Generate: newOauth2Generate,
    getOauthToken: getOauthToken
}
