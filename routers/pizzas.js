const express = require('express');
const router = express.Router();

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

//index
router.get("/", (req, res) => {
	res.json(menu);
});

// show
router.get("/:id", (req, res) => {
	console.log(req.params.id)
	res.send(`Hai richiesto la pizza con id: ${req.params.id}`)
});

// store
router.post('', function (req, res) {
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
	res.send('Eliminazione della pizza ' + req.params.id);
});

module.exports = router;