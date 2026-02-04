const { Pool } = require('pg');

const paramConnessione = {
	connectionString: "postgres://postgres:postgres@localhost:5432/db_social_ok"
};

//Preparo il pool di connessioni
let db = new Pool(paramConnessione);

//Creo un evento per log di debug per OGNI NUOVA connessione del pool
db.on("connect", function (client) {
	console.log("Connessione avviata!"); //all'avvio
	client.on("notice", msg => console.log("Client notice --> ", msg)); //per warning
})

//Vulnerabile
//qui si può fare il DROP TABLE dopo il ; oppure usare UNION per restituire dati di altre tabelle (es. password)
const inputUtente = "1 OR 1=1;";
const myBadQuery = `SELECT id, username FROM users WHERE id = ${inputUtente}`;

db.query(myBadQuery).then(function (dati) {
	console.log("Risultati multipli: ", dati.rows);
}).catch(function (err) {
	console.error("Connection error: ", err.message);
});

//Prepared statement (corretto)
const myQuery = `SELECT id, username FROM users WHERE id = $1`;
const params = [
	20	// --> user id per query precedente
];

db.query(myQuery, params).then(function (dati) {
	console.log("Risultato corretto: ", dati.rows);
}).catch(function (err) {
	console.error("Connection error: ", err.message);
});

/* NOTA
Il caso d'uso più noto è quello in query di login.

SELECT * FROM users WHERE username = "utente@dominio.it" AND password ="passwordHashata"

restituisce una riga se l'utente esiste e la password è corretta.

immaginate la query che recupera dati esterni dal form di login:
SELECT * FROM users WHERE username = "???" AND password ="???"

l'utente scrive in entrambi i campi:
" or ""="

la query risultante diventa:

SELECT * FROM users WHERE username = "" or ""="" AND password ="" or ""=""

anche qui restituiamo TUTTA la tabella.
se l'autenticazione viene fatta su rows[0] l'utente risulta comunque loggato.
se il primo utente inserito in DB è l'admin o un superuser (molto comune) l'attaccante diventa super-user

*/