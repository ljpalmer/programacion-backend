export const generateProductErrorInfo = (product)=>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
        - title: needs to be a String, received: ${product.title}
        - description: needs to be a String, received: ${product.description}
        - code: needs to be a Number, received: ${product.code}
        - price: needs to be a Number, received: ${product.price}
        - status: needs to be a String, received: ${product.status}
        - stock: needs to be a Number, received: ${product.stock}
        - category: needs to be a String, received: ${product.category}
        - thumbnail: needs to be a String, received: ${product.thumbnail}`
}

export const generateCartProductErrorInfo = (pid)=>{
    return `The product that are you looking for wasn't in DB.
    List of required properties:
        - pid: needs to be a mongo ObjectId, received ${pid}`
}