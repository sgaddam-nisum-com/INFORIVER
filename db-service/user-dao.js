

/**
 * Local Module dependencies
 */
 
var db = require("../db-service/connection").db();
var log = require('../logger/logger').LOG;


exports.viewUsers = function (callback){
	db.users.find({}, function(err, users) {
		if(err || !users){
		callback("[]");
			}else{
		  callback(users);
		}
	});	
}

exports.saveUser = function (fname,lname,gender){
	db.users.save({firstname: fname, lastname: lname, sex: gender}, function(err, saved) {
	  if( err || !saved ) log.error("User not saved"+err);
	  else log.info("User saved");
	});
}