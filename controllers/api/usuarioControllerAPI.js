let Usuario = require('../../models/usuario');

exports.usuarioList = function(req, res) {
    Usuario.find({}, function(err, usuario) {
        res.status(200).json({
            data: usuario
        });
    });
};

exports.usuarioCreate = function(req, res) {
    let usuario = new Usuario({
        nombre: req.body.nombre
    });

    usuario.save(function(err) {
        res.status(200).json(usuario);
    });
};

exports.usuarioReserva = function(req, res) {
    Usuario.findById(req.body.id, function(err, usuario) {
        usuario.reservar(req.body.biciId, req.body.desde, req.body.hasta, function(err) {
            res.status(200).send();
        })
    })
};