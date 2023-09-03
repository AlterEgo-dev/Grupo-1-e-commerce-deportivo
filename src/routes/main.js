const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const { authSession, authRedirectSession } = require('../middlewares/authSession');

router.get('/', mainController.home);

router.get('/carrito', authSession, mainController.carrito); /* de momento el carrito solo estara disponible para usuarios logueados, más la vista de detalle para todo publico */

router.get('/carrito/:id', authSession, mainController.carrito);

module.exports = router;