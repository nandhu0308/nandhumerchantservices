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
var smtpRouter = require('./smtp/smtpRouters/smtpRouter');

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

app.listen(3000, function(){
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




