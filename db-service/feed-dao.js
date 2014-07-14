/**
 * Local Module dependencies
 */
 
var db = require("../db-service/connection").db();
var util = require("../util/util");
var log = require('../logger/logger').LOG;
var commonPror = require("../config.json").common;

var contentLength = commonPror.contentLength;


exports.viewFeeds = function(size, start, subject, callback) {
	var from = (start - 1) * size;
	this.viewUrls(subject, function(returnValue) {		
		if(returnValue.length === 0){callback("[]");}
		var allUrlIds = new Array();
		for (i = 0; i < returnValue.length; i++) {
			allUrlIds.push("" + returnValue[i]._id);			
			var returns = (i == (returnValue.length-1));
			if(returns){
				db.feeds.find({urlId : { $in : allUrlIds }}, {skip : from, limit : size,  sort: [['published', 'desc']]}, function(err, feeds) {				
					if (err || !feeds) {
						callback("[]");
					} else {
						callback(feeds);
					}
				});
			}
		}
	});
}

exports.viewUrls = function(name, callback) {
	db.urls.find({name : name}, function(err, URLS) {		
		if (err || !URLS) {
			callback("[]");
		} else {
			callback(URLS);
		}
	});
}

exports.viewAllUrls = function(callback) {
	db.urls.find({}, function(err, URLS) {
		if (err || !URLS) {
			callback("[]");
		} else {
			callback(URLS);
		}
	});
}

exports.viewSubjects = function(callback) {
	db.urls.find({},{'name' : 1}, function(err, URLS) {
		if (err || !URLS) {
			callback("[]");
		} else {
			callback(URLS);
		}
	});
}

exports.viewLastModifiedDate = function (urlId, callback){
	db.feed_updates.find({urlId : urlId},{'published' : 1}, function(err, dte) {	
		if (err){
			callback(err,null);
		}
		else if(!dte[0]){
			callback(err,dte);
		}
		else{
			callback(err,dte[0].published);		
		}
	});
}

exports.viewLastModifiedDateObj = function (urlId, callback){
	db.feed_updates.find({urlId : urlId},{'published' : 1}, function(err, dte) {	
		if (err){
			callback(err,null);
		}
		else if(!dte[0]){
			callback(err,dte);
		}
		else{			
			callback(err,dte);		
		}
	});
}

exports.saveFeed = function(urlId, feed_urlIn, dbDate, feedCollection) {
	log.info("Saving feeds of url '" + feed_urlIn + "'");
	for (i = 0; i < feedCollection.length; i++) {	
		var feed =  feedCollection[i];;
		// save feeds
		var checkin = util.compare(dbDate,feed.published);	
		if(checkin){
			db.feeds.save({
				title : feed.title,
				author : feed.author,
				URL : feed.link,
				published : feed.published,
				description : feed.content.toString().substr(0,
						contentLength),
				urlId : urlId
			}, function(err, saved) {
				if (err || !saved)
					log.error("Feed with title : " + feed.title
							+ " not saved" + err);
			});
	}
	}
}

exports.saveLastModifiedDate = function (urlId, published){		
		this.viewLastModifiedDateObj(urlId, function(err,dbDte){
		if(err){
			log.error(err);
		}
		else if(!dbDte[0]){			
			db.feed_updates.save({urlId : urlId, published : published});
		}
		else{
			db.feed_updates.save({_id: dbDte[0]._id, urlId : urlId, published : published});
		}
	});

}

exports.saveUrl = function(name, URLIn) {
	// save url
	db.urls.save({
		name : name,
		URL : URLIn
	}, function(err, saved) {
		if (err || !saved)
			log.error("URL not saved" + err);
		else
			log.debug("URL saved");
	});
}

// Each article has the following properties:
// 
// * "title" - The article title (String).
// * "author" - The author's name (String).
// * "link" - The original article link (String).
// * "content" - The HTML content of the article (String).
// * "published" - The date that the article was published (Date).
// * "feed" - {name, source, link}
// 