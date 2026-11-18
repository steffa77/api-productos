CREATE DATABASE tiendaperu;
USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos
(
   id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   marca         VARCHAR(100)  NOT NULL,
   descripcion   VARCHAR(200)  NOT NULL,
   precio        DECIMAL(10,2) NOT NULL,
   stock         INT UNSIGNED  NOT NULL DEFAULT 0,
   create_at     DATETIME      NOT NULL DEFAULT NOW(),
   update_at     DATETIME      NULL 
)ENGINE = INNODB;

INSERT INTO productos
     (marca, descripcion, precio, stock)
     VALUES
     ('Samsung', 'TV 55', 2500, 10),
     ('LG', 'Lavadora', 1200, 3),
     ('Sony', 'Playstation 5', 3200, 2);
     
SELECT * FROM productos;

CREATE TABLE IF NOT EXISTS clientes
(
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos   VARCHAR(100) NOT NULL,
    nombres     VARCHAR(100) NOT NULL,
    telefono    VARCHAR(20)  NOT NULL,
    direccion   VARCHAR(150) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    create_at   DATETIME     NOT NULL DEFAULT NOW(),
    update_at  DATETIME     NULL
) ENGINE = INNODB;

INSERT INTO clientes
    (apellidos, nombres, telefono, direccion, email)
VALUES
    ('Quispe Mamani', 'Juan Carlos', '987654321', 'Av. Arequipa 123', 'juan.quispe@gmail.com'),
    ('Flores Castro', 'María Elena', '912345678', 'Jr. Unión 456', 'maria.flores@gmail.com'),
    ('Gómez Rojas', 'Luis Alberto', '955443322', 'Calle Real 789', 'luis.gomez@gmail.com');

CREATE TABLE IF NOT EXISTS proveedores
(
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonsocial  VARCHAR(150) NOT NULL,
    contacto     VARCHAR(100) NOT NULL,
    ruc          VARCHAR(11)  NOT NULL,
    direccion    VARCHAR(150) NOT NULL,
    create_at    DATETIME     NOT NULL DEFAULT NOW(),
    update_at   DATETIME     NULL
) ENGINE = INNODB;

INSERT INTO proveedores
    (razonsocial, contacto, ruc, direccion)
VALUES
    ('Distribuidora Lima S.A.C.', 'Carlos Mendoza', '20123456789', 'Av. Argentina 1020'),
    ('Importaciones Andinas E.I.R.L.', 'Ana Torres', '20987654321', 'Calle Mercaderes 310'),
    ('Comercializadora del Norte S.R.L.', 'Pedro Vargas', '20456789123', 'Av. España 540');

SELECT * FROM clientes;
SELECT * FROM proveedores;