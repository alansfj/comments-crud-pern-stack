CREATE DATABASE prueba;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    description VARCHAR(500)
);

INSERT INTO comments (email, description)
VALUES ('john.doe@gmail.com', 'mi comentario'); 


DELETE FROM table_name WHERE condition;