/**
 * Module dependencies
 */
  
var feedService = require("../feed-service/feed-service");
var log = require('../logger/logger').LOG;
var util = require("../util/util");

exports.runScheduler = function() {
	log.info('Scheduler started at : ' + util.getDateTime());
	saveFeeds();
}

function saveFeeds() {
	// get urls
	feedService.viewAllUrls(function(urlColection) {
		log.info("Started merging feeds .....");
		for ( var i = 0; i < urlColection.length; i++) {
			// get id of surl to map with feeds
			var urlId = "" + urlColection[i]._id + "";
			// Save feeds of the give url with url id for mapping b/w feed and
			// url
			feedService.getFeedsFromUrl(urlId, urlColection[i].URL, function(
					urlIdIn, feed_urlIn, dbDate, feeds) {
				if (feeds) {
					feedService.saveFeeds(urlIdIn, feed_urlIn, dbDate, feeds);
				}
			});
		}
	});
}