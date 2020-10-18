var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/UsuarioController');

router.get('/', usuarioController.list);
router.get('/create', usuarioController.create_get);
router.post('/create', usuarioController.create_post);
router.post('/:id/delete', usuarioController.delete_post);
router.get('/:id/update', usuarioController.update_get);
router.post('/:id/update', usuarioController.update_post);

module.exports = router;