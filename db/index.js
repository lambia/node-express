import { Pool } from 'pg';

const paramConnessione = {
	connectionString: process.env.DATABASE_URL
};

let db = new Pool(paramConnessione);

// db.on("connect", function (client) {
// 	console.log("Connessione avviata!");
// 	client.on("notice", msg => console.log("Client notice --> ", msg));
// })

export default db;