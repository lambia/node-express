import 'dotenv/config';
import express from 'express';
const app = express()
const port = 3000

import pizzasRouter from './routers/pizzas.js';

//importo il middleware
import checkTimeMiddleware from './middlewares/checkTime.js';
import errorsHandlerMiddleware from './middlewares/errorsHandler.js';
import notFoundMiddleware from './middlewares/notFound.js';

//Middleware per uso globale
// app.use(checkTimeMiddleware);

// in produzione è consigliabile bypassare con reverse proxy nginx configurato per servire direttamente i file statici
// oppure si può aggiungere un layer di caching sempre con nginx o con varnish
app.use(express.static("public"));
//body parser per evitare req.body=undefined
app.use(express.json());


app.get('/', (req, res) => {
	res.type("html").send('<h1>Benvenuto nel server della mia pizzeria</h1>');
});

//Middleware per uso su route specifica
// app.get('/prova', checkTimeMiddleware, (req, res) => {
// throw new Error("Si è spaccato qualcosa");
// 	res.type("html").send('<h1>Benvenuto nel server della mia pizzeria</h1>');
// });

app.get("/debug", (req, res) => {
	const richiestaSemplificata = {
		query: req.query, //query params come ?chiave=valore
		params: req.params, //parametri di rotta (non ancora visti)
		body: req.body, //body richesta json/form (non ancora visti)
		headers: req.headers, //header allegati alla richiesta
		method: req.method, //metodo HTTP (GET, POST, …)
		originalUrl: req.originalUrl, //URL richiesto
		path: req.path, //path (senza query)
		protocol: req.protocol, //http / https
		ip: req.ip, //IP client
		secure: req.secure, //true se HTTPS
		xhr: req.xhr, //true se AJAX
	};

	console.log("Ricevuta richiesta: ", richiestaSemplificata);

	res.json(richiestaSemplificata);
});

//Middleware su gruppo di rotte
// app.use("/pizzas", checkTimeMiddleware);

app.use("/pizzas", checkTimeMiddleware, pizzasRouter);

//Penultimo: Se nessuna rotta soddisfa la richiesta
app.use(notFoundMiddleware);

//Ultimo: Se c'è un errore (potrebbe essere un errore nel middleware notfound)
app.use(errorsHandlerMiddleware);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});