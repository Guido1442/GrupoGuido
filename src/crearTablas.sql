CREATE TABLE aida.Materia (
    id_Materia INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    PRIMARY KEY (id_Materia)
);

CREATE TABLE aida.Carrera (
    id_Carrera INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    PRIMARY KEY (id_Carrera)
);

CREATE TABLE aida.MateriasPorCarrera (
    id_Materia INT NOT NULL,
    id_Carrera INT NOT NULL,

    PRIMARY KEY (id_Materia, id_Carrera),
    FOREIGN KEY (id_Materia) REFERENCES aida.Materia(id_Materia),
    FOREIGN KEY (id_Carrera) REFERENCES aida.Carrera(id_Carrera)
);

CREATE TABLE aida.Cursada (
    lu TEXT NOT NULL,
    id_Materia INT NOT NULL,
    cuatrimestre VARCHAR(100) NOT NULL,
    nota INT NOT NULL,
    profesor VARCHAR(100) NOT NULL,

    PRIMARY KEY (lu, id_Materia, cuatrimestre),
    FOREIGN KEY (lu) REFERENCES aida.alumnos(lu),
    FOREIGN KEY (id_Materia) REFERENCES aida.Materia(id_Materia)
);

CREATE TABLE aida.AlumnosPorCarrera (
    lu TEXT NOT NULL,
    id_Carrera INT NOT NULL,

    PRIMARY KEY (lu, id_Carrera),
    FOREIGN KEY (lu) REFERENCES aida.alumnos(lu),
    FOREIGN KEY (id_Carrera) REFERENCES aida.Carrera(id_Carrera)
);

CREATE TABLE aida.usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    nombre VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso DATE
);
