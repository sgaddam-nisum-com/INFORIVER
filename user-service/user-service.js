var userDao = require("../db-service/user-dao");


exports.saveUser =function (feed_url,start,end){
	userDao.saveUser(feed_url,start,end);
}

exports.viewUsers =function (callback){
	userDao.viewUsers(callback);
}