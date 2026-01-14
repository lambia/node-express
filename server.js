const express = require('express')
const pizzasRouter = require("./routers/pizzas");
const app = express()
const port = 3000

// in produzione è consigliabile bypassare con reverse proxy nginx configurato per servire direttamente i file statici
// oppure si può aggiungere un layer di caching sempre con nginx o con varnish
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.type("html").send('<h1>Benvenuto nel server della mia pizzeria</h1>');
});

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

app.use("/pizzas", pizzasRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});