/**
 * Local Module dependencies
 */
 
var feedService = require("../feed-service/feed-service");
var userService = require("../user-service/user-service");
var scheduler = require("../scheduler/scheduler");
var log = require('../logger/logger').LOG;
var util = require("../util/util");

/*
 * GET  pages.
 */

var commonPror = require("../config.json").common;

var SIZE_CONSTANT = commonPror.resultSize;

exports.clearFeeds = function(request, response) {
	response.json('In Progress...');
};

exports.clearFeed = function(request, response) {
	response.json('In Progress...');
};

exports.clearUrls = function(request, response) {
	response.json('In Progress...');
};

exports.clearUrl = function(request, response) {
	response.json('In Progress...');
};


exports.showFile = function(request, response) {
	log.info("showFile express ");
	var filename = request.param(commonPror.filename);
	response.sendfile('./view/'+filename+'.htm');   
};


exports.home = function(request, response) {
	response.json('Succesfully Installed...');
};

exports.runScheduler = function(request, response) {
	scheduler.runScheduler();
	response.json('Running...');
};

exports.viewUsers = function(request, response) {
	userService.viewUsers(function(returnValue) {
		response.json(JSON.stringify(returnValue));
	});
};

exports.viewFeeds = function(request, response) {
	// var size = request.param("size");
	var start = request.param(commonPror.start);
	var subject = request.param(commonPror.subject);
	feedService.viewFeeds(SIZE_CONSTANT, start, subject, function(returnValue) {
		try {
			response.json(JSON.stringify(returnValue));
			response.end();
		} catch (e) {
			log.error("Error : "+e);
		}
	});
};

exports.saveUser = function(request, response) {
	var firstname = request.param(commonPror.firstname);
	var lastname = request.param(commonPror.lastname);
	var gender = request.param(commonPror.gender);
	try{
		var users = userService.saveUser(firstname, lastname, gender);
	} catch (e) {
			log.error("Error : "+e);
	}
	response.json('{}');
};

exports.saveFeed = function(request, response) {
	var titleIn = request.param(commonPror.title);
	var descriptionIn = request.param(commonPror.description);
	var URLIn = request.param(commonPror.URL);
	try{
		var users = feedService.saveFeed(titleIn, descriptionIn, URLIn);
	} catch (e) {
			log.error("Error : "+e);
	}
	response.json('{}');
};

exports.saveUrl = function(request, response) {
	var name = request.param(commonPror.name);
	var link = request.param(commonPror.link);
	
	try{
		var users = feedService.saveUrl(name, link);
	} catch (e) {
			log.error("Error : "+e);
	}

	response.json('{}');
};

exports.viewUrls = function(request, response) {
	var name = request.param(commonPror.name);

	feedService.viewUrls(name, function(returnValue) {
	try{
		response.json(JSON.stringify(returnValue));
	} catch (e) {
			log.error("Error : "+e);
	}		
	});
};

exports.viewAllUrls = function(request, response) {
	feedService.viewAllUrls(function(returnValue) {		
		try{
		response.json(JSON.stringify(returnValue));
	} catch (e) {
			log.error("Error : "+e);
	}	
	});
};

exports.viewSubjects = function(request, response) {
	feedService.viewSubjects(function(returnValue) {	
	try{
		var uniqueSubjects = util.sort_unique(returnValue);
		response.json(JSON.stringify(uniqueSubjects));
	} catch (e) {
			log.error("Error : "+e);
			response.json('{}');
	}	
	});
};

