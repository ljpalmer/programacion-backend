import cart from "./Cart.js";
import productCart from './ProductCart.js'

export default class CartManager{    
    constructor(path, persistenceManager, file_name) {
        this._carts = [];
        this._path = path;
        this._file_name = file_name;
        this._persistenceManager = persistenceManager;

        let success = false;

        if(!persistenceManager.fncValidateIfExistsPath(path)){
            console.log('[SYSTEM] Creando directorio con mkdirAsync: '+ this._path);
            persistenceManager.fncMakeDirectory(this._path);            
        // }  else{
        //     console.log('[SYSTEM] Carpeta ya se encuentra creada');            
        }     

        if(!persistenceManager.fncValidateIfExistsPath(path+'/'+file_name)){     
            success = persistenceManager.fncWritePersistence(this._path, file_name, this._carts);   
            (success == true) ? console.log('[SYSTEM] Se guardo correctamente.') : console.log('[SYSTEM] Problemas al guardar.');               
        } 
    }

    async addCart(){        
        this._carts = await this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);             

        let id  = this.generateIdForCart();
        let objCart = new cart(id,[]);   
            
        this._carts.push(objCart);

        console.log(`[SYSTEM] Se registro el Carrito el ID generado es: ${id}`); 

        let success = this._persistenceManager.fncWritePersistence(this._path, this._file_name, this._carts);   
        (success == true) ? console.log('[SYSTEM] Se guardo correctamente.') : console.log('[SYSTEM] Problemas al guardar.');     
        return id;
    }

    addProductValidatingCart(cart, productId){
        let productPosition = cart.products.findIndex(x => x.product == productId)
        if(productPosition>=0){
            cart.products[productPosition].quantity+=1;
        }else{
            cart.products.push(new productCart(productId,1));
        }
        return cart;
    }

    async addProductToCart(idCart, productId){        
        this._carts = await this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);

        let success = false;
        let cartPosition = this._carts.findIndex(x => x.id == idCart);

        console.log(`[SYSTEM] Posición de la búsqueda: ${cartPosition}`);

        if (cartPosition >= 0) {

            console.log("[SYSTEM] Carrito Encontrado: "+ Object.entries(this._carts[cartPosition]));                   
            let cart = this.addProductValidatingCart(this._carts[cartPosition],productId);            
            this._carts[cartPosition] = cart;
            success = this._persistenceManager.fncWritePersistence(this._path, this._file_name, this._carts);  
                         
        } else {

            console.log("[SYSTEM] Código ingresado no existe (Not Found!).");
            success = false;

        }

        return success;
    }

    async getCartById(id){        
        this._carts = await this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);             

        let rpta = new cart();        
        let cartPosition = this._carts.findIndex(x => x.id == id);

        console.log(`[SYSTEM] Posición de la búsqueda: ${cartPosition}`);

        if (cartPosition >= 0) {
            console.log("[SYSTEM] Producto Encontrado: "+ Object.entries(this._carts[cartPosition]));
            rpta = this._carts[cartPosition];
        } else {
            console.log("[SYSTEM] Código ingresado no existe (Not Found!).");
            rpta = new cart(0,[]);
        }
        return rpta;
    }

    generateIdForCart(){          
        this._carts = this._persistenceManager.fncReadFromPersistence(this._path,this._file_name);

        let id = 0;      

        if(this._carts.length == 0){
            id = 1;
        }else{
            id = this._carts[this._carts.length - 1].id + 1;
        }        
        return id;
    }
}