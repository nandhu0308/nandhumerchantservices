var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var connection = require('./db');
var ProductRouters = require('./products/productRouters/ProductRouter');
var ApplicationsRouter = require('./applications/applicationsRouters/applicationsRouter');

app.use(cors());
app.use(bodyParser.json());
app.use('/product', ProductRouters);
app.use('/applications', ApplicationsRouter);

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
})