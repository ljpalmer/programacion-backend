# TERCER ENTREGABLE: BACKEND

### CONSIGNA

Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.


### ASPECTOS A INCLUIR

Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

El servidor debe contar con los siguientes endpoints:

- ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.

Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados

- ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 

Sugerencias
Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets. 


### FORMATO DEL ENTREGABLE

Link al repositorio de Github con el proyecto completo, el cual debe incluir:
carpeta src con app.js dentro y tu ProductManager dentro.
package.json con la info del proyecto.
NO INCLUIR LOS node_modules generados.


### PROCESO DE TESTING

EndPoint GET: http://localhost:9090/products
Respuesta: 
{"Data":[{"title":"Producto Prueba Nuevo 01","description":"Este es un producto de prueba nuevo","price":300,"thumbnail":"Sin Imagen","code":"abc890","stock":10,"id":1},{"title":"Producto Prueba Nuevo 02","description":"Este es un producto de prueba nuevo","price":200,"thumbnail":"Sin Imagen","code":"abc567","stock":50,"id":2},{"title":"Producto Prueba Nuevo 03","description":"Este es un producto de prueba nuevo","price":200,"thumbnail":"Sin Imagen","code":"abc390","stock":100,"id":3}],"Success":true,"WithLimit":false}

EndPoint GET: http://localhost:9090/products?limit=2
Respuesta:
{"Data":[{"title":"Producto Prueba Nuevo 01","description":"Este es un producto de prueba nuevo","price":300,"thumbnail":"Sin Imagen","code":"abc890","stock":10,"id":1},{"title":"Producto Prueba Nuevo 02","description":"Este es un producto de prueba nuevo","price":200,"thumbnail":"Sin Imagen","code":"abc567","stock":50,"id":2}],"Success":true,"WithLimit":true}

EndPoint GET: http://localhost:9090/products/2
Respuesta:
{"Data":{"title":"Producto Prueba Nuevo 02","description":"Este es un producto de prueba nuevo","price":200,"thumbnail":"Sin Imagen","code":"abc567","stock":50,"id":2},"Success":true}

EndPoint GET: http://localhost:9090/products/5  (No Existe)
Respuesta:
{"Data":{"title":"","description":"","price":0,"thumbnail":"","code":"","stock":0,"id":0},"Success":false}

