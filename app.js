/**
 * Module dependencies.
 */

//Global variables : Since they are not declared using the var keyword
express = require('express'),
rootDir = __dirname,
config = require('./config'),
http = require('http'),
path = require('path'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
app = express();

// all environments
app.set('port', 3000);
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: config.SESSION_SECRET , 
	saveUninitialized: true,
	resave: true 
}));
app.use(express.static(__dirname + '/public'));


// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

module.exports = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});