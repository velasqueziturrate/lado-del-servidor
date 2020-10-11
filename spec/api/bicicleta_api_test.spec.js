var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www'); //estp se hace para que el servidor se ejecute al realizarse el test, no es necesario hacer el npm start
const { head } = require('request');
const { application, json } = require('express');

var base_url = 'http://localhost:3000/api/bicicletas';

describe('Bicicleta API', () => {

    beforeAll(function(done) {

        mongoose.connection.close().then(() => {
            var mongoDB = 'mongodb://localhost/testdb';
            mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

            mongoose.set('useCreateIndex', true);
            var db = mongoose.connection;

            db.on('error', console.error.bind(console, 'MongoDB connection error: '));
            db.once('open', function() {

                console.log('We are connected to test database!');
                done();

            });
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            done();
        });
    });

    describe('GET BICICLETAS /', () => {
        it("Status 200", (done) => {
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicleta.length).toBe(0);
                done();
            })
        })
    })

    describe('POST BICICLETAS /create', () => {
        it("Status 200", (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{"code":10, "color":"rojo", "modelo":"urbana", "lat":-34, "lng":-54}';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                var result = JSON.parse(body);
                console.log(result)
                expect(result.bicicleta.color).toBe('rojo')
                done()
            })
        })
    })
})







/*
beforeEach(() => {
    Bicicleta.allBicis = []
});

describe('Bicicleta API', () => {
    describe('get BICICLETAS', () => {
        it('status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'negro', 'urbana');
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function (error, response, body) {
                expect(response.statusCode).toBe(200);
            }) //es necesario poner function, no funciona la flecha, y la llave tiene que estar pegada al parentesis
        })
    })

    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{"id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54}'; //es lo mismo que hacer el formato json y pasarlo a string (creo que eso se hace en el proyecto de angular)

            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');
                done(); //es lo que espera jasmine para detener el test, algunas veces el test termina antes de que se realiza la peticion POST
            })
        });
    })
})
*/