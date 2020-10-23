var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis((err, bicicletas) => {
        res.render('indexbici', { bicis: bicicletas });
    });
}

exports.bicicleta_create_get = function(req, res) {
    res.render('create')
}

exports.bicicleta_create_post = function(req, res) {
    var newBici = {
        "code": req.body.code,
        "color": req.body.color,
        "modelo": req.body.modelo,
        "ubicacion": [req.body.lat, req.body.lng]
    };

    console.log(newBici);

    Bicicleta.add(newBici, function(err, bici) {
        if (err) return console.log(err);
        res.redirect('/bicicletas');
    })
}

exports.bicicleta_update_get = function(req, res) {

    var bici = Bicicleta.findById(req.params.id)

    res.render('update', { bici: bici })
}

exports.bicicleta_update_post = function(req, res) {
    var bici = Bicicleta.findById(req.params.id)
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;

    bici.ubicacion = [req.body.lat, req.body.lng]

    res.redirect('/bicicletas')
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeId(req.params.id)

    res.redirect('/bicicletas')
}