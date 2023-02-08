import Product from "./Product.js";


export default class ProductManager{    
    constructor(path, persistenceManager, file_name) {
        this._products = [];
        this._path = path;
        this._file_name = file_name;
        this._persistenceManager = persistenceManager;
        if(!persistenceManager.fncValidateIfExistsPath(path)){            

            console.log('[SYSTEM] Creando directorio con mkdirAsync: '+ this._path);
            persistenceManager.fncMakeDirectory(this._path);

            let success = persistenceManager.fncWritePersistence(this._path, file_name, this._products);   
                (success == true) ? console.log('[SYSTEM] Se guardo correctamente.') : console.log('[SYSTEM] Problemas al guardar.');               

        }  else{
            console.log('[SYSTEM] Carpeta ya se encuentra creada');
        }      
    }
    addProduct(product) {        
        if (!this.fncValidateCodeProductExist(product.code)) {
            if (this.fncValidateAllValuesIncluded(product)) {
                // product.id = this._products.length + 1;
                product.id  = this.generateIdForProduct();
                this._products.push(product);
                console.log(`[SYSTEM] Se registro el producto el ID generado es: ${product.id}`);                
                let success = this._persistenceManager.fncWritePersistence(this._path, this._file_name, this._products);   
                (success == true) ? console.log('[SYSTEM] Se guardo correctamente.') : console.log('[SYSTEM] Problemas al guardar.');

            } else {
                console.log(`[SYSTEM] No se pudo agregar el producto ${product.title}, falta 1 o mas argumentos.`);
            }
        } else {
            console.log("[SYSTEM] No se pudo agregar el producto, campo [Code] Repetido.");
        }
    };

    async getProducts() {        
        this._products = await this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);

        if (this._products.length == 0) {
            console.log("[SYSTEM] Lista de productos vacia.");
        } else {
            this._products.forEach(product => {
                   console.log(product);
                });
            console.log(`[SYSTEM] Tamaño de la lista ${this._products.length}.`);
        }
        return this._products;
    };

    async getProductById(id) {        
        this._products = await this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);
        let rpta = new Product('','',0,'','',0);
        console.log(this._products);
        let productPosition = this._products.findIndex(x => x.id == id);
        console.log(`[SYSTEM] Posición de la búsqueda: ${productPosition}`);
        if (productPosition >= 0) {
            console.log("[SYSTEM] Producto Encontrado: "+ Object.entries(this._products[productPosition]));
            rpta = this._products[productPosition];
        } else {
            console.log("[SYSTEM] Código ingresado no existe (Not Found!).");
        }
        return rpta;
    };

    updateProductById(id, product){
        this._products = this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);

        let productPosition = this._products.findIndex(x => x.id == id);
        if (productPosition >= 0) {
            //actualizamos los valores
            this._products[productPosition].title = product.title;
            this._products[productPosition].description = product.description;
            this._products[productPosition].price = product.price;
            this._products[productPosition].thumbnail = product.thumbnail;
            this._products[productPosition].code = product.code;
            this._products[productPosition].stock = product.stock;
            //Persistimos los datos
            let success = this._persistenceManager.fncWritePersistence(this._path, this._file_name, this._products);   
            (success == true) ? console.log('[SYSTEM] Se guardo correctamente') : console.log('[SYSTEM] Problemas al guardar');
        }else{
            //no se puede actualizar
            console.log("[SYSTEM] Producto no encontrado, no se pudo actualizar.");
        }
    }

    generateIdForProduct(){
        let id = 0;        
        this._products = this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);
        if(this._products.length == 0){
            id = 1;
        }else{
            id = this._products[this._products.length - 1].id + 1;
        }
        return id;
    }

    deleteProductById(id){
        this._products = this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);
        let productPosition = this._products.findIndex(x => x.id == id);
        if (productPosition >= 0) {
            this._products.splice(productPosition, 1);
            let success = this._persistenceManager.fncWritePersistence(this._path, this._file_name, this._products);   
            (success == true) ? console.log('[SYSTEM] Se elimino correctamente') : console.log('[SYSTEM] Problemas al guardar la eliminacion');
        }else{
            console.log("[SYSTEM] Producto no encontrado, no se pudo eliminar.");
        }
    }

    numberRecords(){
        this._products = this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);
        return this._products.length;
    }

    fncValidateCodeProductExist(code) {
        let keyFunction = false;
        this._products.forEach(product => {
                if (product.code === code) {
                    keyFunction=true;
                }
            });
        return keyFunction;
    }

    fncValidateAllValuesIncluded(product) {
        let keyFunction = true;
        let values = Object.values(product);
        values.forEach(element => {
            if (typeof element === 'undefined') {
                keyFunction = false;
            };
        });
        return keyFunction;
    }    
}