var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

//Enable CORS
var allowCrossDomain = function(req, res, next) {    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.use(allowCrossDomain);

//Middleware to log stuff, more middleware will be added later
router.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

module.exports = router;
