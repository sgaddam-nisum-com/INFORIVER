/**
 * Module dependencies.
 */
 
 var log4js = require('log4js');
 
 /**
 * Local File dependencies
 */
 
var commonPror = require("../config.json").logger;

log4js.configure({
	appenders: [
	   { type: commonPror.logAppender, filename: commonPror.logFilename, category: commonPror.Category }
	  ]
});

var logger  = log4js.getLogger(commonPror.logFilename);
            logger.setLevel(commonPror.logLevel);
            Object.defineProperty(exports, "LOG", {
            value:logger,
});