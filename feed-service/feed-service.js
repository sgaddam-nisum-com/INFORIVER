/**
 * Module dependencies.
 */

 var feed = require("feed-read");

/**
 * Local Module dependencies
 */

var feedDao = require("../db-service/feed-dao");
var log = require('../logger/logger').LOG;
var util = require("../util/util");

//var _this = this;

exports.saveFeeds = function(urlId, feed_urlIn, dbDate, feedCollection) {
        feedDao.saveFeed(urlId, feed_urlIn, dbDate, feedCollection);
}

exports.saveUrl = function(name, link) {
        feedDao.saveUrl(name, link);
}

exports.viewFeeds = function(size, start, subject, callback) {
        feedDao.viewFeeds(size, start, subject, callback);
}

exports.viewUrls = function(name, callback) {
        feedDao.viewUrls(name, callback);
}

exports.viewAllUrls = function(callback) {
        feedDao.viewAllUrls(callback);
}

exports.viewSubjects = function(callback) {
        feedDao.viewSubjects(callback);
}

exports.getFeedsFromUrl = function(urlId, feed_url, callback) {
        feed(feed_url, function(err, articles) {
			    if (err) {
                        log.info("Error : " + err+".Connection problem with "+feed_url);
                }				
				else{	
					//filtering old feeds
					var feedLastModified = null;
					if(articles.length > 0){									
						feedLastModified = articles[0].published;
						getLastModifiedDate(urlId, function(err,dbDte){
							if (err){
								log.error("Error : " + err+". problem in getting last modified date for urlId : "+urlId);
								callback(urlId, feed_url, null, null)
								}
								var proceed = util.compare(dbDte, feedLastModified);								
								if(!proceed){
									callback(urlId, feed_url,dbDte, null);								
								}
								else{																		
									callback(urlId, feed_url, dbDte, articles);
									setLastModifiedDate(urlId, feedLastModified);
								}
							});
					}
						//filtering old feeds done					
				}
				
        });
}

function getLastModifiedDate(urlId, callback){	
	return feedDao.viewLastModifiedDate(urlId, callback);
}

function setLastModifiedDate(urlId, published){
	feedDao.saveLastModifiedDate(urlId, published);
}