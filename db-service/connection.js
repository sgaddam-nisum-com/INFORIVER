/**
 * File dependencies.
 */
var dbConfig = require("../config.json").db_config;
var log = require('../logger/logger').LOG;

var host = dbConfig.host;
var port = dbConfig.port;

var dbName = dbConfig.dbName

var uName = dbConfig.uName;
var pwd = dbConfig.pwd;
var db = null; 

//var databaseUrl = ""+uName+":"+pwd+"@"+host+":"+port+"/"+dbName;
var databaseUrl = "mongodb://sgaddam:Reset123$@paulo.mongohq.com:10097/INFORIVER";
var collections =  ["users", "feeds", "urls", "feed_updates"];


exports.db = function() {
    if (db === null) {
        db = require("mongojs").connect(databaseUrl, collections);
		log.info("DB Connection Created for "+databaseUrl);
    }
    return db;
}