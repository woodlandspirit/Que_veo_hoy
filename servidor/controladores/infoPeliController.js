const con = require('../lib/conexionbd');

function obtenerInfo(req, res) {
    let sql = 'SELECT *, actor.nombre AS actor_nombre, genero.nombre AS nombre FROM pelicula\
    INNER JOIN genero on pelicula.genero_id = genero.id\
    INNER JOIN actor_pelicula on actor_pelicula.pelicula_id = pelicula.id\
    INNER JOIN actor on actor_pelicula.actor_id = actor.id\
    WHERE pelicula.id = ' + req.params.id;
    con.query (sql, function(error, resultado, fields) {
        if(error) {
            console.log('Hubo un error en su consulta', error.message);
            res.status(404).send('Hubo un error en su consulta');
        }
        if(resultado.length == 0) {
            res.redirect('/error.html');
        }
        let actores = [];
        for(const i in resultado){
            actores.push({nombre:resultado[i]['actor_nombre']})
        };
        const respuesta = {
            'pelicula': resultado[0],
            'actores': actores
        }

        res.send(JSON.stringify(respuesta));
    })
}

module.exports = {
    obtenerInfo: obtenerInfo
}