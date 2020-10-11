var mongoose = require('mongoose');
var Usuario = require('../../models/usuario');
var Bicicleta = require('../../models/bicicleta');
var Reserva = require('../../models/reserva');


describe('Testing Usuarios', () => {
    beforeAll((done) => { mongoose.connection.close(done) });

    beforeEach((done) => {
        mongoose.disconnect();

        var mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB is connected');
            done();
        });
    });

    afterEach((done) => {
        Reserva.deleteMany({}, function(err, success) {
            if (err) {
                console.log(err);
            }

            Usuario.deleteMany({}, function(err, success) {
                if (err) {
                    console.log(err);
                }

                Bicicleta.deleteMany({}, function(err, success) {
                    if (err) {
                        console.log(err);
                    }

                    mongoose.connection.close(done);
                });
            })
        });
    });

    describe('Cuando se reserva una Bici', () => {
        it('Debe existir la reserva', (done) => {
            var user = new Usuario({ nombre: 'Luciano' });
            user.save();

            var bicicleta = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
            bicicleta.save();

            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            user.reservar(bicicleta.id, today, tomorrow, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, bookings) {
                    console.log(bookings)
                    expect(bookings.length).toBe(1);
                    expect(bookings[0].diasDeReserva()).toBe(2);
                    expect(bookings[0].bicicleta.code).toBe(1);
                    expect(bookings[0].usuario.nombre).toBe(user.nombre);

                    done();
                });
            });
        });
    });


});