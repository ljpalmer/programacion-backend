import { Router } from "express";
import product from '../../class/product/Product.js';
import { productsModel } from '../../daos/mongo/product.mongo.js'

const PRODUCT = Router();

PRODUCT.get('/', async (request, response) => {
    const { page = 1, limit = 10, sort, category, stock } = request.query;

    let responseEndPoint = {
        payload : [],
        totalPages : null,
        prevPage : null,
        nextPage: null,
        page: null,
        hasPrevPage : null,
        hasNextPage : null,
        prevLink : null,
        nextLink : null    
    };    
    // const limit = request.query.limit;
    // const page = request.query.page;
    var limitePaginate  = 0 ;
    var nroPage  = 0 ;
    if(limit){
        limitePaginate = parseInt(limit);
    }else{
        limitePaginate = 10;
    }
    if(page){
        nroPage = parseInt(page);
    }else{
        nroPage = 1;
    }
    const query = {};
    if(category){
        query.category = category;
    }
    if(stock){
        query.stock = { $gt: stock }; // o 0
    }
    // Sort by name in ascending order
    const options = {
        page: nroPage,
        limit: limitePaginate,                
    };
    if(sort){
        if(sort == "desc" || sort == "asc"){
            options.sort  = {price: sort};
        }//Caso contrario no vale        
    }
 
    var collection = await productsModel.paginate(query, options);
    
    try {
            responseEndPoint.payload = collection.docs;
            responseEndPoint.totalPages = collection.totalPages;
            responseEndPoint.prevPage = collection.prevPage;
            responseEndPoint.nextPage = collection.nextPage;
            responseEndPoint.page = collection.page;
            responseEndPoint.hasPrevPage = collection.hasPrevPage;
            responseEndPoint.hasNextPage = collection.hasNextPage;
            if(collection.hasPrevPage){
                responseEndPoint.prevLink = "Tiene Prev";
            }
            if(collection.hasNextPage){
                responseEndPoint.nextLink = "Tiene Next";
            }
    } catch (error) {
        responseEndPoint.Exito = false;
    }
    response.send(JSON.stringify(responseEndPoint));
});

export default PRODUCT;