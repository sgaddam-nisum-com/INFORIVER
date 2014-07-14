/**
 * Module dependencies.
 */
 
 var schedule = require('node-schedule');
 var log = require('../logger/logger').LOG;

/**
 * Local Module dependencies
 */
 
var schedulerService = require("./scheduler-service");
var commonPror = require("../config.json").common;

// var CORNRULE = "10,20,30,40 * * * *";
// every Sunday at 2:30pm : {hour: 14, minute: 30, dayOfWeek: 0}
var recurrenceRule = commonPror.recurrenceRule;

//every Sunday at 2:30pm:
var job = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function() {
	schedulerService.runScheduler();
});


exports.runScheduler = function() {
	log.info('Manually started scheduler ... ');
	schedulerService.runScheduler();
}

exports.cancel = function() {
	job.cancel();
}