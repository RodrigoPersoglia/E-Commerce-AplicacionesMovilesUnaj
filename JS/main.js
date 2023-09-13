import {NavMenu,NavMenu2,Footer,CardVarios} from './components.js'


const header = $('#Menu');
const contacto = $('#Contacto');
const subcontainer1 = $('#varios-subcontainer-body-1');
const subcontainer2 = $('#varios-subcontainer-body-2');
const subcontainer3 = $('#varios-subcontainer-body-3');
let shortMenu = false;

window.onload = () => {
    header.html(NavMenu());
    contacto.html(Footer());
    CargarVarios();
    $('#menu-oculto').click(MostrarMenu);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

function MostrarMenu(){
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

const CargarVarios = () => {
    fetch(`https://fakestoreapi.com/products`)
    .then(response => response.json())
    .then(data => {
         var list = data;
        const max = list.length;
        for (var i = 0; i < 4; i++) {
            var x = getRandomInt(0,max);
            var y = getRandomInt(0,max);
            subcontainer1.append(CardVarios(list[i].id,Recortar(list[i].title,28),list[i].price.toLocaleString('fr-FR', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}),list[i].image))
            subcontainer2.append(CardVarios(list[x].id,Recortar(list[x].title,28),list[x].price.toLocaleString('fr-FR', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}),list[x].image))
            subcontainer3.append(CardVarios(list[y].id,Recortar(list[y].title,28),list[y].price.toLocaleString('fr-FR', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}),list[y].image))
         }
    });
}

const Recortar = (palabra,largo) => {
    if(palabra.length>largo){
        return palabra.substring(0,largo-3)+'...';
    }
    return palabra
}

