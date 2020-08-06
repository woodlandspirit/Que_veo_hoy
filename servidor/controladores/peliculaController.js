const con = require('../lib/conexionbd');

function obtenerPelicula(req, res) {
    let sql = construirConsulta(req);
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log('Hubo un error al cargar las películas.', error.message);
            return res.status(404).send('Hubo une error al cargar las películas.');
        } else {
            let countSql = "SELECT COUNT(*) AS TOTAL FROM pelicula " + generarFiltrosSql(req); 
            con.query(countSql, function (error, resultadoCount, fields){
                const response = {
                    'peliculas': resultado,
                    'total': resultadoCount[0]['TOTAL']
                };
                res.send(JSON.stringify(response));
            })
        }
    })
}

function construirConsulta(req) {
    let orden = req.query.columna_orden;
    let tipo_orden = req.query.tipo_orden;
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    
    let sql = 'SELECT * FROM pelicula';

    sql += generarFiltrosSql(req);
    sql += generarOrdenSql(orden, tipo_orden);
    sql += generarPaginacionSql(pagina, cantidad);

    return sql;
};

function generarFiltrosSql(req) {
    let anio = req.query.anio;
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let multiplesCondiciones = false;
    
    let sql = '';
    if(genero || titulo || anio) {
        sql += ' WHERE ';
    }
    if(genero) {
        sql += ' pelicula.genero_id = ' + genero.toString();
        multiplesCondiciones = true;
    }
    if(anio) {
        if(multiplesCondiciones) {
            sql += ' AND ';
        }
        sql += ' pelicula.anio = '+ anio.toString();
        multiplesCondiciones = true;
    }
    if(titulo) {
        if(multiplesCondiciones) {
            sql += ' AND ';
        }
        sql += ' pelicula.titulo like "%' + titulo.toString() + '%"';
    }
    return sql;

}

function generarOrdenSql(columna_orden, tipo_orden) {
    return ' ORDER BY ' + columna_orden + ' ' + tipo_orden;
}

function generarPaginacionSql(pagina, cantidad) {
    return ' LIMIT ' + (pagina-1)*cantidad + ',' + cantidad;
}


module.exports = {
    obtenerPelicula: obtenerPelicula,
};