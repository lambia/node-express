function checkTime(req, res, next) {

	const currentTime = new Date().toLocaleString();
	console.log(`[${currentTime}][Request] ${req.originalUrl}`);

	next();

}

module.exports = checkTime;