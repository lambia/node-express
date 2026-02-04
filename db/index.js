const { Pool } = require('pg');

const paramConnessione = {
	// user: "postgres",
	// password: "postgres",
	// host: "localhost",
	// port: "5432",
	// database: "db_social_ok"
	connectionString: "postgres://postgres:postgres@localhost:5432/db_social_ok"
};

let db = new Pool(paramConnessione);

db.on("connect", function (client) {
	console.log("Connessione avviata!");

	client.on("notice", msg => console.log("Client notice --> ", msg));
})

// const myQuery = `SELECT id, name FROM users WHERE id = $1`;

// db.query(myQuery, ["20"]).then(function (dati) {
// 	console.log("Risultati: ", dati.rows);

// }).catch(function (err) {
// 	console.error("Connection error: ", err.message);
// });


// db.query(`SELECT id, title FROM posts`).then(function (dati) {
// 	console.log("Risultati: ", dati.rows);
// }).catch(function (err) {
// 	console.error("Connection error: ", err.message);
// });

module.exports = db;