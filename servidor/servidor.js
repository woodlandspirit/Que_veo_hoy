//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
let peliculaController = require('./controladores/peliculaController');
let generoController = require('./controladores/generoController');
let infoPeliController = require('./controladores/infoPeliController');
let recomendacionController = require('./controladores/recomendacionController');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/peliculas', peliculaController.obtenerPelicula);
app.get('/generos', generoController.obtenerGenero);
app.get('/peliculas/recomendacion', recomendacionController.obtenerRecomendacion);
app.get('/peliculas/:id', infoPeliController.obtenerInfo);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando pedidos en el puerto " + puerto );
});

