import { Pool } from 'pg';

const paramConnessione = {
	// connectionString: "postgres://postgres:postgres@localhost:5432/db_social_ok"
	connectionString: process.env.DATABASE_URL
};

let db = new Pool(paramConnessione);

// db.on("connect", function (client) {
// 	console.log("Connessione avviata!");
// 	client.on("notice", msg => console.log("Client notice --> ", msg));
// })

export default db;