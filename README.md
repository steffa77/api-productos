# API REST
## Sistema para compartir datos de Tienda Perú

**Requerimientos**
1. Instalación NodeJS (v20 o superior)
2. Acceso a Internet (instalar dependencias)
3. Clone el repositorio, y ejecute ```npm install```
4. Requerimos el archivo ```.env``` 

```bash
PORT=3000
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_CONNECTION_LIMIT=10
```
5. Necesitamos la tabla _productos_
```sql
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
```
6. Ejecutar el proyecto escribiendo: ```node src/server```
7. Utilice [Postman](https://www.postman.com/product/api-client/) o cualquier software similar para realizar el TEST

