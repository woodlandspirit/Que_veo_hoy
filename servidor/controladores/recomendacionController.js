const con = require('../lib/conexionbd');

function obtenerRecomendacion(req, res) {
    let sql = generarRecomendacion(req);

    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log('Hubo un error al obtener la recomendación.', error.message);
            return res.status(404).send('Hubo un error al obtener la recomendación.');
        }
        const response = {
            'peliculas': resultado
          };
          res.send(JSON.stringify(response));
        });
}

function generarRecomendacion(req) {
    let genero = req.query.genero;
    let anioInicio = req.query.anio_inicio;
    let anioFin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;
    let multiplesCondiciones = false;

    let sql = 'SELECT trama, titulo, pelicula.id AS id, poster, genero.nombre FROM pelicula\
    INNER JOIN genero on pelicula.genero_id = genero.id';

    if(genero || anioInicio || anioFin || puntuacion) {
        sql += ' WHERE ';
    }

    if(genero) {
        sql +=' genero.nombre = "' + genero.toString() +'"';
        multiplesCondiciones = true;
    }
    if(anioInicio) {
        if(multiplesCondiciones) {
            sql += ' AND ';
        }
        sql += ' pelicula.fecha_lanzamiento >= "'+ anioInicio.toString() + '-01-01"';
        multiplesCondiciones = true;
    }
    if(anioFin) {
        if(multiplesCondiciones) {
            sql += ' AND ';
        }
        sql += ' pelicula.fecha_lanzamiento <= "'+ anioFin.toString() + '-12-31"';
        multiplesCondiciones = true;
    }
    if(puntuacion) {
        if(multiplesCondiciones) {
            sql += ' AND ';
        }
        sql += ' pelicula.puntuacion = ' + puntuacion.toString();
    }
    return sql;
}


module.exports = {
    obtenerRecomendacion: obtenerRecomendacion
}