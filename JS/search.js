import { NavMenu, NavMenu2, Footer, CardCategory, Card } from './components.js'

const itemsPorPagina = 6;
let paginaActual = 1;
let filtrosVisibles = true;
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
let listElements = [];

let minPrice = null;
let maxPrice = null;
let product = '';
let category = '';
const header = $('#Menu');
const contacto = $('#Contacto');
const categorias = $('#categorias-populares-container');
const ProductosFiltrados = $('#productos-filtrados');
const searchButton = $('#searchButton');
const selectCategorias = $('#selectCategoria');
const input = $('#filtro-input');
const limpiarFiltros = $('#right-header');
const favoritos = $('#favoritos-container');
const pagIni = $('#pag-ini');
const pagFin = $('#pag-fin');
const filtrosShow= $('#filtros-show');
const filtros = $('#filtros');
const filtrosLimpiar = $('#filtros-limpiar');

const precioMinimo = document.getElementById("minPrice");
const precioMaximo = document.getElementById("maxPrice");
let shortMenu = false;

window.onload = () => {
    header.html(NavMenu());
    contacto.html(Footer());
    cargarCategoriasPopulares();
    cargarCategorias();
    searchButton.click(Search);
    const parametros = getQueryParams();
    if (parametros.product != undefined) { product += parametros.product; }
    if (parametros.category != undefined) { category += parametros.category; }
    CargarProductos();
    limpiarFiltros.click(Limpiar);
    favoritos.click(CargarFavoritos);
    filtrosShow.click(OcultarFiltros);
    $('#menu-oculto').click(MostrarMenu);
    actualizarBotones();
}

const Limpiar = () => {
    selectCategorias.val('Todas');
    precioMinimo.value = null;
    precioMaximo.value = null;
    input.val('');
}

precioMinimo.addEventListener('change', precios)
precioMaximo.addEventListener('change', precios)


function precios() {
    minPrice = null;
    maxPrice = null;
    if (precioMaximo.value != '' & precioMaximo.value != '') {
        if ((precioMaximo.value - precioMinimo.value) > -1) {
            minPrice = precioMinimo.value;
            maxPrice = precioMaximo.value;
        }
        else { 
            precioMinimo.value = null;
            maxPrice = precioMaximo.value;
        }
    }
    else {
        if (precioMinimo.value != '') { minPrice = precioMinimo.value; }
        else { maxPrice = precioMaximo.value; }
    }
}

const Recortar = (palabra) => {
    if (palabra.length > 20) {
        return palabra.substring(0, 17) + '...';
    }
    return palabra
}

const CargarProductos = () => {
    listElements = [];
    let query;
    let searchProduct = `%${product}%`;
    if (category != '') {
        query = `https://fakestoreapi.com/products/category/${category}`;
    }
    else {
        query = 'https://fakestoreapi.com/products';
    }
    ProductosFiltrados.innerHTML = null;
    fetch(query).then(response => response.json()).then(data => {
        data.forEach(e => {
            if (isLike(e.title, searchProduct)) {
                listElements.push(e)
            }
        });
        mostrarElementos(0);
    });
}

const CargarFavoritos = () => {

    listElements = [];
    let list = getFavoritos();
    let query = 'https://fakestoreapi.com/products';
    ProductosFiltrados.html(null);
    fetch(query)
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {
                if (list.includes(String(e.id))) {
                    listElements.push(e)
                }
            });
            paginaActual = 1;
            mostrarElementos(favoritos.offset().top);
            pagIni.text(paginaActual)
            actualizarBotones()
        });
}

const getFavoritos = () => {
    let favoritos = localStorage.getItem('favoritos');
    if (favoritos) {
        let list = JSON.parse(favoritos);
        return list;
    }
    return null;
}

function getQueryParams() {
    var urlParams;
    var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
};

const Search = () => {
    listElements = [];
    let searchProduct = `%${input.val()}%`;
    let searchCategory = selectCategorias.val();
    let query = 'https://fakestoreapi.com/products';
    ProductosFiltrados.html(null);
    fetch(query)
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {
                if (isLike(e.title, searchProduct) && (searchCategory == 'Todas' || e.category == searchCategory)
                    && (minPrice == null || e.price >= minPrice) && (maxPrice == null || e.price <= maxPrice)) {
                    listElements.push(e)
                }
            });
            paginaActual = 1;
            mostrarElementos(favoritos.offset().top);
            pagIni.text(paginaActual)
            actualizarBotones();
        });
}

const cargarCategoriasPopulares = () => {
    var list = ['https://w7.pngwing.com/pngs/568/379/png-transparent-technology-computer-icons-technology-electronics-text-logo.png'];
    list.push('http://st.depositphotos.com/1531425/2687/v/950/depositphotos_26873627-stock-illustration-jewelry-icons.jpg')
    list.push('https://static.vecteezy.com/system/resources/previews/000/546/209/original/businessman-in-suit-head-vector-icon.jpg')
    list.push('https://tse4.mm.bing.net/th?id=OIP.k-pDYOyHL7Ls-dPjt2g54AHaHa&pid=Api&P=0&h=180')
    var url = 'https://fakestoreapi.com/products/categories';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 4; i++) {
                categorias.append(CardCategory(data[i], list[i]));
            }
        });
}

const cargarCategorias = () => {
    var url = 'https://fakestoreapi.com/products/categories';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {
                var option = $('<option>', {
                    value: e.categoriaId,
                    text: e
                })
                selectCategorias.append(option)
            });
        });
}

const isLike = (string, pattern) => {
    const escapedPattern = pattern.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = escapedPattern.replace(/%/g, '.*').replace(/_/g, '.');
    const regex = new RegExp('^' + regexPattern + '$');
    return regex.test(string.toLowerCase());
}

function MostrarMenu() {
    if (shortMenu) {
        header.html(NavMenu());
        shortMenu = false;
    }
    else {
        header.html(NavMenu2());
        shortMenu = true;
    }

    $('#menu-oculto').click(MostrarMenu);
}

function mostrarElementos(posicion) {
    var cantPag = Math.ceil(listElements.length / itemsPorPagina);
    pagFin.text(cantPag)
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const elementosPagina = listElements.slice(inicio, fin);

    ProductosFiltrados.html(null);

    for (const e of elementosPagina) {
        ProductosFiltrados.append(Card(e.id, Recortar(e.title), e.price.toLocaleString('fr-FR', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }), e.image));
    }
    Posicionar(posicion)
}

function Posicionar(posicion) {
    $('html, body').animate({
        scrollTop: posicion
    }, 500);
}

function actualizarBotones() {
    anterior.disabled = paginaActual === 1;
    siguiente.disabled = paginaActual === Math.ceil(listElements.length / itemsPorPagina);
}

anterior.addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarElementos(favoritos.offset().top);
        actualizarBotones();
        pagIni.text(paginaActual)
    }
});

siguiente.addEventListener('click', () => {
    if (paginaActual < Math.ceil(listElements.length / itemsPorPagina)) {
        paginaActual++;
        mostrarElementos(favoritos.offset().top);
        actualizarBotones();
        pagIni.text(paginaActual)
    }
});


function OcultarFiltros(){
    if(filtrosVisibles){      
        filtros.hide();
        filtrosLimpiar.hide();
        filtrosVisibles = false;
    }
    else{
        filtros.show();
        filtrosLimpiar.show();        
        filtrosVisibles = true;
    }

}