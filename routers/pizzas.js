import express from 'express';
const router = express.Router();

import pizzaController from '../controllers/pizzaController.js';

//Importo il middleware
import checkTimeMiddleware from '../middlewares/checkTime.js';

//Middleware per uso su Router
// router.use(checkTimeMiddleware);

//Middleware per uso su singola rotta del router
// router.get("/", checkTimeMiddleware, pizzaController.index);

router.get("/", pizzaController.index);
// router.get("/:id", pizzaController.show);
router.post('/', pizzaController.store);
router.put('/:id', pizzaController.update);
router.patch('/:id', pizzaController.modify);
router.delete('/:id', pizzaController.destroy);

export default router;