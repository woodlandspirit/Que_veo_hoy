const con = require('../lib/conexionbd');

function obtenerGenero (req, res) {
    let sql = 'SELECT * FROM genero';
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log('Hubo un error al cargar los generos.', error.message);
            return res.status(404).send('Hubo un error al cargar los generos.');
        }
        else {
            const response = {
                'generos': resultado
            };
            res.send(JSON.stringify(response));
        }
    })
}

module.exports = {
    obtenerGenero: obtenerGenero
};