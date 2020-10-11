var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuarioList);
router.post('/create', usuarioController.usuarioCreate);
router.post('/reserva', usuarioController.usuarioReserva);

module.exports = router;