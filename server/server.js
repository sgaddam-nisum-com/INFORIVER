/**
 * Module dependencies.
 */
 
var express = require('express');
var http = require('http');
var path = require('path');
require("cf-autoconfig");


/**
 * local Module dependencies
 */
 
var requestProcesser = require("./request-processer");
var serverConfig = require("../config.json").server_config;
var log = require('../logger/logger').LOG;

var app = express();

// all environments
app.set('port', serverConfig.port);
// app.set('views', path.join(__dirname, 'views'));
 app.use(express.favicon());
 app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
 app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// function to give access for cross domain control
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods','PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/', requestProcesser.home);

app.get('/viewusers', requestProcesser.viewUsers);
app.get('/viewfeeds', requestProcesser.viewFeeds);

app.get('/viewurls', requestProcesser.viewUrls);
app.get('/viewsubjects', requestProcesser.viewSubjects);
app.get('/viewallurls', requestProcesser.viewAllUrls);

//admin functions 
app.get('/runScheduler', requestProcesser.runScheduler);
app.get('/saveuser', requestProcesser.saveUser);
app.get('/savefeed', requestProcesser.saveFeed);
app.get('/saveurl', requestProcesser.saveUrl);
//latest
app.get('/clearFeeds', requestProcesser.clearFeeds);
app.get('/clearFeed', requestProcesser.clearFeed);
app.get('/clearUrls', requestProcesser.clearFeeds);
app.get('/clearUrl', requestProcesser.clearUrl);


app.get('/show.htm', requestProcesser.showFile);


http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + app.get('port'));
});



