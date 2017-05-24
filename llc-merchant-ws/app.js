var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var connection = require('./db');
var ProductRouters = require('./products/productRouters/ProductRouter');

app.use(cors());
app.use(bodyParser.json());
app.use('/product', ProductRouters);

app.listen(3000, function(){
    console.log('Running on Port 3000...');
    connection.sync({
        force : false
    }).then(function(){
        console.log('DB Synced...');
    }).catch(function(){
        console.log('DB Sync Failed...');
    });
})