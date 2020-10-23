var Bicicleta = require('../../models/bicicleta')

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis(function(err, bicis) {
        res.status(200).json({ bicicleta: bicis });
    })
}

exports.bicicleta_create = function(req, res) {
    var bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng],
    })

    //bici.ubicacion = [req.body.lat, req.body.lng]

    Bicicleta.add(bici, function(err, newBici) {
        res.status(200).json({
            bicicleta: newBici
        })
    })
}

exports.bicicleta_delete = function(req, res) {
    Bicicleta.removeByCode(req.body.code, function(error, targetBici) {
        res.status(204).send();
    });
}