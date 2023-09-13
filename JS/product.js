import {NavMenu,NavMenu2,Footer,CardProductoPrincipal} from './components.js'

const header = $('#Menu');
const contacto = $('#Contacto');
const main = $('#main');
let productoId=null;
let shortMenu = false;
let favoritosBTN;

window.onload = () => {
    header.html(NavMenu());
    contacto.html(Footer());
    const parametros = getQueryParams();
    if(parametros.id!=undefined){productoId=parametros.id;}
    CargarProductos();
    $('#menu-oculto').click(MostrarMenu);
}

const agregar = () => {
    postCarrito('./product.html?id='+productoId)
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

const postCarrito = (ruta) => {
    alert('Producto Agregado');
    location.href=ruta;
}

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
                list.splice(list.indexOf(idProduct))
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
    let list = JSON.parse(favoritos);
    return list.includes(idProduct)          
}