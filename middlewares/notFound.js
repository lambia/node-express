function notFound(req, res, next) {

	res.status(404).json({
		success: false,
		error: "Page not found"
	});

}

module.exports = notFound;