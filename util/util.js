/**
 * Utilities
 */
 
exports.sort_unique = function (array){
	var flags = [], output = [] ;
	for( var i=0; i<array.length; i++) {
		if( flags[array[i].name]) continue;
		flags[array[i].name] = true;
		output.push(array[i]);
	}
	return output;
};

exports.getDateTime = function (){
	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

	var sec = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return year + ":" + month + ":" + day + " - " + hour + ":" + min + ":"
			+ sec;
}

exports.compare = function (dbDte, feedUrlDte){
	var dbDate = new Date(dbDte);
	var feedUrlDate = new Date(feedUrlDte);
	if (((feedUrlDate.valid()) && (feedUrlDate > dbDate)) ||   dbDte == null || dbDte.length === 0){
	  return true;
	}
    return false;
}

Date.prototype.valid = function() {
  return isFinite(this);
}
