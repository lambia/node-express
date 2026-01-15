const express = require('express');
const router = express.Router();

const pizzaController = require("../controllers/pizzaController");

//Importo il middleware
const checkTimeMiddleware = require("../middlewares/checkTime");

//Middleware per uso su Router
// router.use(checkTimeMiddleware);

//Middleware per uso su singola rotta del router
// router.get("/", checkTimeMiddleware, pizzaController.index);

router.get("/", pizzaController.index);
router.get("/:id", pizzaController.show);
router.post('/', pizzaController.store);
router.put('/:id', pizzaController.update);
router.patch('/:id', pizzaController.modify);
router.delete('/:id', pizzaController.destroy);

module.exports = router;