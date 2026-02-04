const { Pool } = require('pg');

const paramConnessione = {
	connectionString: "postgres://postgres:postgres@localhost:5432/db_social_ok"
};

let db = new Pool(paramConnessione);

// db.on("connect", function (client) {
// 	console.log("Connessione avviata!");
// 	client.on("notice", msg => console.log("Client notice --> ", msg));
// })

module.exports = db;