const pizzas = require("../data/pizzas");
const db = require("../db/index.js");

async function indexUno(req, res) {
	//Uso un try / catch
	try {
		const queryResult = await db.query(`SELECT id, title, tags, date FROM postsERRORE`);

		if (!queryResult.rowCount > 0) { //si può fare un controllo anche su rows.length
			return res.sendStatus(404);
		}

		res.json(queryResult.rows);

	} catch (error) {
		//In caso di errore lo stampo in console ma emetto un nuovo errore più generico da passare al middleware
		console.log("Connection error: ", error.message); //<-- errore interno
		throw new Error("Errore nel recuperare i dati"); //<-- errore passato al middleware (e quindi all'utente)
		//attenzione: se non faccio throw restituiamo una risposta vuota!!
	}
}

async function indexDue(req, res) {

	//Eseguo query e restituisco risultati
	//In caso di errore, verrà stampato gestito dal middleware
	//Utile se il middleware è scritto tenendo conto di cosa mostrare all'utente (errore interno = errore utente)
	//spesso si realizza passando error.message dal middleware e/o confrontando il codice errore con una mappa/dizionario 
	const queryResult = await db.query(`SELECT id, title, tags, date FROM postsERRORE`); //<-- per testare

	if (!queryResult.rowCount > 0) {
		return res.sendStatus(404);
	}

	res.json(queryResult.rows);
}

async function index(req, res) {

	const { rows, rowCount } = await db.query(`SELECT id, title, tags, date FROM posts`);

	const success = (rowCount > 0);
	const statusCode = success ? 200 : 404;

	const response = {
		success,
		payload: rows
	};

	return res.status(statusCode).json(response);
}

async function show(req, res) {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		throw new Error("ID non valido");
	}

	const statement = `SELECT id, title, tags, date FROM posts WHERE id = $1`;
	const params = [id];

	const { rows, rowCount } = await db.query(statement, params);

	const success = (rowCount > 0);
	const statusCode = success ? 200 : 404;

	const response = {
		success,
		payload: rows[0]
	};

	if (!success) {
		response.error = "Not found";
		response.message = "Articolo non trovata";
	}

	res.status(statusCode).json(response);
}

async function store(req, res) {
	console.log("okok")
	const { title, tags } = req.body;

	if (!title || !title.trim().length || title.trim().length < 4) {
		throw new Error("Titolo non valido");
	}

	if (!tags || !tags.length || !Array.isArray(tags)) {
		//si possono controllare anche i singoli valori ma per DB basta che sia array []
		throw new Error("Tag non validi");
	}

	//per inserire sul db è meglio avvertire postgres che $2 è di un certo ::tipo per applicare il casting
	const statement = `INSERT INTO posts (title, tags) VALUES ($1, $2::json) RETURNING *`;
	//sarebbe più corretto: "RETURNING id" o comunque recuperare solo i campi necessari

	//tags arriva come array (decodificato da un json) -> lo facciamo tornare ad essere JSON
	const params = [title, JSON.stringify(tags)];

	const { rows, rowCount } = await db.query(statement, params);

	const success = (rowCount == 1);
	const statusCode = success ? 201 : 404;

	const response = {
		success,
		payload: rows[0]
	};

	if (!success) {
		response.error = "Errore imprevisto";
		response.message = "Impossibile aggiungere l'elemento";
	}

	res.status(statusCode).json(response);

}

async function update(req, res) {

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

async function modify(req, res) {

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

async function destroy(req, res) {
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