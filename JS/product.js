import {NavMenu,NavMenu2,Footer,CardProductoPrincipal} from './components.js'

const header = $('#header-page');
const contacto = $('#footer-page');
const main = $('#main-page');
let productoId=null;
let shortMenu = false;
let favoritosBTN;

window.onload = () => {
    header.html(NavMenu());
    contacto.html(Footer());
    const parametros = getQueryParams();
    if(parametros.id!=undefined){
        productoId=parametros.id;
        AddHistorial('historial',productoId)
    }
    CargarProductos();
    $('#menu-oculto').click(MostrarMenu);
}

const favoritos = () => {
    AddOrRemoveFavoritos('favoritos',productoId);
    if(!favoritosBTN){
        favoritosBTN  = document.getElementById("favoritosBTN")
    }
    if(IsFavorito(productoId)){
        favoritosBTN.textContent = 'Eliminar de favoritos';
        
    }
    else{
        favoritosBTN.textContent = 'Agregar a favoritos';
    }
}

const agregar=()=>{
    AgregarAlCarrito('carrito', productoId);
    window.location.href = 'carrito.html';
}

const CargarProductos = () => {
    let text = ''
    if(IsFavorito(productoId)){
        text = 'Eliminar de favoritos';
        
    }
    else{
        text = 'Agregar a favoritos';
    }
    let query =  `https://fakestoreapi.com/products/${productoId}`;
    main.html =null;
    fetch(query)
    .then(response => response.json())
    .then(e => {
        main.append(CardProductoPrincipal(e.title,e.image,e.description,e.price.toLocaleString('fr-FR', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}),e.category,15,text));
        document.getElementById("favoritosBTN").addEventListener("click", favoritos);
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

const MostrarMenu = () => {
    if(shortMenu) {
        header.html(NavMenu());
        shortMenu = false;
    }
    else{
        header.html(NavMenu2());
        shortMenu = true;
    }
    
    $('#menu-oculto').click(MostrarMenu);
}

const AddOrRemoveFavoritos = (nameItem,idProduct) => {
        let favoritos = localStorage.getItem(nameItem);
        if(favoritos){
            let list = JSON.parse(favoritos);
            if (list.includes(idProduct)) {
                list.splice(list.indexOf(idProduct),1)
                ReemplazarLocalStorage(nameItem,list)
              } else {
                list.unshift(idProduct);
                ReemplazarLocalStorage(nameItem,list)
              }
        }
        else{
            localStorage.setItem(nameItem, JSON.stringify([idProduct]));
        }
}

const AddHistorial= (nameItem,idProduct) => {
    let favoritos = localStorage.getItem(nameItem);
    if(favoritos){
        let list = JSON.parse(favoritos);
        if (list.includes(idProduct)) {
            list.splice(list.indexOf(idProduct),1)
            list.unshift(idProduct);
            ReemplazarLocalStorage(nameItem,list)
          } else {
            list.unshift(idProduct);
            ReemplazarLocalStorage(nameItem,list)
          }
    }
    else{
        localStorage.setItem(nameItem, JSON.stringify([idProduct]));
    }
}

const ReemplazarLocalStorage = (nameItem,list) =>  {
    localStorage.removeItem(nameItem);
    localStorage.setItem(nameItem, JSON.stringify(list));
}

const IsFavorito = (idProduct) => {
    let favoritos = localStorage.getItem('favoritos');
    if (favoritos) {
        let list = JSON.parse(favoritos);
        return list.includes(idProduct);
    } else {
        return false; 
    }
}


const AgregarAlCarrito = (nameItem, idProduct) => {
    let carrito = localStorage.getItem(nameItem) ? JSON.parse(localStorage.getItem(nameItem)) : [];
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProduct) {
            carrito[i].cantidad++;
            ReemplazarLocalStorage(nameItem,carrito);
            return; 
        }
    }
    carrito.push({ id: idProduct, cantidad: 1 });
    ReemplazarLocalStorage(nameItem,carrito);
};
