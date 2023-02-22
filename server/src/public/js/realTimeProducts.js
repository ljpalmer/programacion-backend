const SOCKET = io();
SOCKET.emit("loadProducts",{});

//Para registrar
const iTitle = document.getElementById("iTitle");
const iDescription = document.getElementById("iDescription");
const iCode = document.getElementById("iCode");
const iPrice = document.getElementById("iPrice");
const iStock = document.getElementById("iStock");
const iStatus = document.getElementById("iStatus");
const iCategory = document.getElementById("iCategory");

//Para Eliminar
const idproduct =  document.getElementById("idproduct");

const btnAgregar = document.getElementById("btnAgregar");
const btnEliminar = document.getElementById("btnEliminar");

const log = document.getElementById("log");


btnAgregar.addEventListener('click', event => {
    // console.log("Presiono Agregar");
    SOCKET.emit('registerProduct', {
        title: iTitle.value,
        description : iDescription.value,
        code : iCode.value,
        price : iPrice.value,
        stock : iStock.value,
        status: 'Activo',
        category: iCategory.value,
        thumbnails : ''
    });
});


btnEliminar.addEventListener('click', event => {
    SOCKET.emit('deleteProduct', {idproduct: idproduct.value});
});


SOCKET.on('listUpdateProducts', products => {
    console.log(products);    
    log.innerHTML = "";
    products.forEach( (product) => {
        log.innerHTML += "<small><b>Id: </b>"+product.id+"</small> | <small><b>Tittle: </b>"+product.title+"</small> | <small><b>Description: </b>"+product.description+"</small> | <small><b>Code: </b>"+product.code+"</small> | <small><b>Price: </b>"+product.price+"</small> | <small><b>Stock: </b>"+product.stock+"</small> | <small><b>Status: </b>"+product.status+"</small><br/>";
    });
});