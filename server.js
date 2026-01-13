const express = require('express')
const app = express()
const port = 3000

const menu = [
	{
		name: "Margherita",
		image: "imgs/pizze/margherita.webp",
		ingredients: ["pomodoro", "mozzarella"],
	}, {
		name: "Marinara",
		image: "imgs/pizze/marinara.jpeg",
		ingredients: ["pomodoro", "aglio", "origano"],
	}, {
		name: "Diavola",
		image: "imgs/pizze/diavola.jpeg",
		ingredients: ["pomodoro", "mozzarella", "salame piccante"],
	}, {
		name: "Bufalina",
		image: "imgs/pizze/bufalina.jpeg",
		ingredients: ["pomodoro", "mozzarella di bufala"],
	}, {
		name: "4 formaggi",
		image: "imgs/pizze/4_formaggi.jpeg",
		ingredients: ["pomodoro", "mozzarella", "gorgonzola", "parmigiano", "ricotta"],
	}
];

// in produzione è consigliabile bypassare con reverse proxy nginx configurato per servire direttamente i file statici
// oppure si può aggiungere un layer di caching sempre con nginx o con varnish
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.type("html").send('<h1>Benvenuto nel server della mia pizzeria</h1>');
});

app.get("/menu", (req, res) => {
	// res.type("json").send(menu);
	// o più semplicemente: 
	res.json(menu);
})

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})