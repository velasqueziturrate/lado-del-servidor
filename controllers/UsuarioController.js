var Usuario = require('../models/usuario');
var Bicicleta = require('../models/bicicleta');

module.exports = {

    list: function(req, res, next) {
        Usuario.find({}, (err, usuarios) => {
            res.render('indexusuario', { listUsuarios: usuarios });

        });
    },

    update_get: function(req, res, next) {
        Usuario.findById(req.params.id, function(err, usuario) {
            res.render('updateusuario', { errors: {}, usuario: usuario });
        });
    },

    update_post: function(req, res, next) {

        var usuarioUpdate = {
            nombre: req.body.nombre
        };

        Usuario.findByIdAndUpdate(req.params.id, usuarioUpdate, (err, usuario) => {
            if (err) {
                console.log(err);
                res.render('updateusuario', { errors: erro.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) });
            } else {
                res.redirect('/usuarios');
                return;
            }
        });

    },

    create_get: function(req, res, next) {
        res.render('createusuario', { errors: {}, usuario: new Usuario() });
    },

    create_post: function(req, res, next) {

        if (req.body.password != req.body.confirm_password) {
            res.render('createusuario', { errors: { confirm_password: { message: 'No coincide con el password ingresado.' } }, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) });
            return;
        }

        Usuario.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }, (err, newUsuario) => {

            if (err) {
                console.log(err);
                res.render('createusuario', { errors: err.errors, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) });
            } else {
                newUsuario.enviar_email_bienvenida();
                res.redirect('/usuarios');
            }
        });

    },

    delete_post: function(req, res, next) {
        Usuario.findByIdAndDelete(req.body.id, function(err) {
            if (err)
                next(err);
            else
                res.redirect('/usuarios');
        });
    },

}