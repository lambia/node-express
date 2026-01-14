const express = require('express');
const router = express.Router();

const pizzas = require("../data/pizzas");

//index
router.get("/", (req, res) => {

	let results = pizzas;

	if (req.query.ingredients) {

		const needle = req.query.ingredients;
		results = pizzas.filter(pizza => pizza.ingredients.includes(needle));

	}

	res.json(results);

});

// show
router.get("/:id", (req, res) => {

	const id = parseInt(req.params.id);
	const result = pizzas.find(pizza => pizza.id === id);

	if (!result) {

		res.status(404);

		res.json({
			error: "Not found",
			message: "Pizza non trovata"
		});
	}

	res.json(result);

});

// store
router.post('/', function (req, res) {
	res.send('Creazione nuova pizza');
});

// update
router.put('/:id', function (req, res) {
	res.send('Modifica integrale della pizza ' + req.params.id);
});

// modify
router.patch('/:id', function (req, res) {
	res.send('Modifica parziale della pizza ' + req.params.id);
});

// destroy
router.delete('/:id', function (req, res) {

	const id = parseInt(req.params.id);
	const result = pizzas.find(pizza => pizza.id === id);

	if (!result) {

		res.status(404);

		res.json({
			error: "Not found",
			message: "Pizza non trovata"
		});
	}

	const pizzaIndex = pizzas.indexOf(result);

	pizzas.splice(pizzaIndex, 1);

	res.sendStatus(204);

});

module.exports = router;