import {NavMenu,Footer,CardProductoPrincipal} from './components.js'

const header = document.getElementById("Menu");
const contacto = document.getElementById("Contacto");
const main = document.getElementById("main");
let productoId=null;

window.onload = () => {
    header.innerHTML=NavMenu();
    contacto.innerHTML=Footer();
    const parametros = getQueryParams();
    if(parametros.id!=undefined){productoId=parametros.id;}
    CargarProductos();
}

const agregar = () => {
    postCarrito('./product.html?id='+productoId)
}

const comprar = () => {
    alert("La compra se concretó exitosamente")
}


const CargarProductos = () => {
    let query =  `https://fakestoreapi.com/products/${productoId}`;
    main.innerHTML =null;
    fetch(query)
    .then(response => response.json())
    .then(e => {
        main.innerHTML=CardProductoPrincipal(e.title,e.image,e.description,e.price.toLocaleString('fr-FR', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}),e.category,15);
        document.getElementById("comprarBTN").addEventListener("click", comprar);
        document.getElementById("addBTN").addEventListener("click", agregar);
        });
}

function getQueryParams() {
    var urlParams;
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
  
    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
       return urlParams;
};

const postCarrito = (ruta) => {
    alert('Producto Agregado');
    location.href=ruta;
}