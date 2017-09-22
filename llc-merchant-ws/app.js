var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var aesjs = require('aes-js');
var app = express();

var connection = require('./db');
var ProductRouters = require('./products/productRouters/ProductRouter');
var ApplicationsRouter = require('./applications/applicationsRouters/applicationsRouter');
var UserRouter = require('./user/userRouters/userRouter');
var authRouter = require('./util-services/servicesRouters/authRouter');
var EntertainmentRouter = require('./entertainment/entertainmentRouters/entertainmentRouter');
var UploadRouter = require('./upload-services/uploadRouters/uploadRouter');
var BroadcasterRouter = require('./broadcasters/broadcasterRouters/broadcasterRouter');
var SmtpRouter = require('./smtp/smtpRouters/smtpRouter');
var TemplateRouter =  require('./smtp/notificationTemplate/templateRouters/templateRouter');
var DocumentRouter = require('./document/documentRouter/documentRouter');
var CommonRouter = require('./common/commonRouter/commonRouter');

var JournalRouter = require('./journal/journalRouters/journalRouter');
var JournalDevicesRouter = require('./journal/journalRouters/journalDeviceRouter');

app.use(cors({origin:true, credentials:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/product', ProductRouters);
app.use('/applications', ApplicationsRouter);
app.use('/user', UserRouter);
app.use('/auth', authRouter);
app.use('/entertainment', EntertainmentRouter);
app.use('/broadcaster', BroadcasterRouter);
app.use('/upload', UploadRouter);
app.use('/smtp',SmtpRouter);
app.use('/notificationtemplate',TemplateRouter);

app.use('/journal', JournalRouter);
app.use('/journal', JournalDevicesRouter);
app.use('/document',DocumentRouter);
app.use('/common',CommonRouter);
app.use('/oauth2callback',UploadRouter);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('Running on Port 3000...');
    connection.sync({
        force : false
    }).then(function(){
        console.log('DB Synced...');
    }).catch(function(err){
        console.log(err);
        console.log('DB Sync Failed...');
    });
});




