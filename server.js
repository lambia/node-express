const express = require('express')
const app = express()
const port = 3000

// in produzione è consigliabile bypassare con reverse proxy nginx configurato per servire direttamente i file statici
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.type("html").send('<h1>Benvenuto nel server della mia pizzeria</h1>');
});

app.get("/menu", (req, res) => {

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

	res.json(menu);

})

app.get("/json", (req, res) => {
	const docente = {
		nome: "Luca",
		cognome: "Lambiase"
	};

	res.type("json").send(docente);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})