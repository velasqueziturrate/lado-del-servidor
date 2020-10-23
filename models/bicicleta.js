const { coerce } = require('debug');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: String,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true } //es un indice de ubicacion
    }
});

bicicletaSchema.methods.toString = function() {
    return 'id: ' + this.code + ' | color: ' + this.color;
}

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.statics.allBicis = function(cb) {
    return this.find({}, cb); //le paso el filtro vacio xq quiero todas las bicis - cb es call back
}

bicicletaSchema.statics.add = function(aBici, cb) {
    this.create(aBici, cb);
}

bicicletaSchema.statics.findByCode = function(aCode, cb) {
    return this.findOne({ code: aCode }, cb);
}

bicicletaSchema.statics.removeByCode = function(aCode, cb) {
    return this.deleteOne({ code: aCode }, cb); //{} => criterio de filtrado
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);