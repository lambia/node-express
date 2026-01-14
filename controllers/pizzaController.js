const pizzas = require("../data/pizzas");

function index(req, res) {

	let results = pizzas;

	if (req.query.ingredients) {

		const needle = req.query.ingredients;
		results = pizzas.filter(pizza => pizza.ingredients.includes(needle));

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
	// copiamo la logica della store
}

function update(req, res) {
	// copiamo la logica dell'update
}

function modify(req, res) {
	// copiamo la logica dell'update
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