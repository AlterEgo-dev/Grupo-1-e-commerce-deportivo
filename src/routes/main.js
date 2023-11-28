const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const { authSession, authRedirectSession } = require('../middlewares/authSession');

router.get('/', mainController.home);

router.get('/carrito', authSession, mainController.carrito); /* de momento el carrito solo estara disponible para usuarios logueados, más la vista de detalle para todo publico */

router.get('/borrar/:id', authSession, mainController.borrarCarrito)

router.get('/carrito/:id', authSession, mainController.carritoId);

module.exports = router;