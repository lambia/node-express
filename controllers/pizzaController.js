const pizzas = require("../data/pizzas");
const db = require("../db/index.js");

async function index(req, res) {

	let results = [];

	try {
		const risultati = await db.query(`SELECT id, title FROM posts`);
		results = risultati.rows;
	} catch (error) {
		console.log("Connection error: ", err.message);
	}

	res.json(results);
}

function show(req, res) {
	const id = parseInt(req.params.id);
	const result = pizzas.find(pizza => pizza.id === id);

	if (!result) {
		//Il return serve ad interrompere davvero la funzione
		return res.status(404).json({
			error: "Not found",
			message: "Pizza non trovata"
		});
	}

	res.json(result);
}

function store(req, res) {
	const pizzasIdsList = pizzas.map(pizza => pizza.id);
	const lastId = Math.max(...pizzasIdsList);
	const newId = lastId + 1;

	const nuovaPizza = {
		id: newId,
		name: req.body.name,
		image: req.body.image,
		ingredients: req.body.ingredients
	};

	pizzas.push(nuovaPizza);

	res.status(201);
	res.json(pizzas[pizzas.length - 1]);
}

function update(req, res) {

	const id = parseInt(req.params.id);
	const result = pizzas.find(pizza => pizza.id === id);

	if (!result) {
		//Il return serve ad interrompere davvero la funzione
		return res.status(404).json({
			error: "Not found",
			message: "Pizza non trovata"
		});
	}

	if (!req.body.name || !req.body.image || !req.body.ingredients) {
		return res.status(400).json({
			error: "Cannot update",
			message: "Passare un oggetto intero o usare PATCH"
		});
	}

	result.name = req.body.name;
	result.image = req.body.image;
	result.ingredients = req.body.ingredients;

	res.json(result);
}

function modify(req, res) {

	const id = parseInt(req.params.id);
	const result = pizzas.find(pizza => pizza.id === id);

	if (!result) {
		//Il return serve ad interrompere davvero la funzione
		return res.status(404).json({
			error: "Not found",
			message: "Pizza non trovata"
		});
	}

	if (req.body.name) { result.name = req.body.name; }
	if (req.body.image) { result.image = req.body.image; }
	if (req.body.ingredients) { result.ingredients = req.body.ingredients; }

	if (!req.body.name && !req.body.image && !req.body.ingredients) {
		return res.status(400).json({
			error: "Cannot update",
			message: "Specificare proprietà valide"
		});
	}

	res.json(result);
}

function destroy(req, res) {
	const id = parseInt(req.params.id);
	const result = pizzas.find(pizza => pizza.id === id);

	if (!result) {
		//Il return serve ad interrompere davvero la funzione
		return res.status(404).json({
			error: "Not found",
			message: "Pizza non trovata"
		});
	}

	const pizzaIndex = pizzas.indexOf(result);

	pizzas.splice(pizzaIndex, 1);

	res.sendStatus(204);
}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }