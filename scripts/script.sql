CREATE DATABASE queveohoy;
use queveohoy;

CREATE TABLE `pelicula` (
    `id` int NOT NULL auto_increment,
    `titulo` varchar(100) NOT NULL,
    `duracion` int(5),
    `director` varchar(400),
    `anio` int(5),
    `fecha_lanzamiento` date,
    `puntuacion` int(2),
    `poster` varchar(300),
    `trama` varchar(700),
    PRIMARY KEY (id)
);

source script-paso-1-peliculas.sql;

CREATE TABLE `genero`(
    `id` int NOT NULL auto_increment,
    `nombre` varchar(30),
    PRIMARY KEY (id)
);

ALTER TABLE pelicula ADD COLUMN genero_id int;

ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

source script-paso-2-generos.sql;

CREATE TABLE `actor`(
    `id` int NOT NULL auto_increment,
    `nombre` varchar(70),
    PRIMARY KEY (id)
);

CREATE TABLE `actor_pelicula`(
    `id` int NOT NULL auto_increment,
    `pelicula_id` int NOT NULL,
    `actor_id` int NOT NULL,
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id),
    FOREIGN KEY (actor_id) REFERENCES actor(id),
    PRIMARY KEY (id)
);

source script-paso-3-actores.sql;