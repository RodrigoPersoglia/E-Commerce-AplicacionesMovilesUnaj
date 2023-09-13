import {NavMenu,NavMenu2,Footer,CardCarrito} from './components.js'

const header = $('#Menu');
const contacto = $('#Contacto');
const carritoContainer = $('#carrito-card-container');
const precioCarrito = $('#precio-total');
const subtotalCarrito = $('#subtotal');
const impuesto= $('#impuesto');
const descuentoResumen= $('#descuento');
const botonComprar= $('#boton-comprar');
const carritovacio= $('#carrito-null');
const carritoInfo= $('#carrito');
var botones = document.querySelectorAll(".eliminarBoton");
let shortMenu = false;

let subtotal = 0;
let imp=0;
let descuento=0;

window.onload = () => {
    header.append(NavMenu());
    contacto.append(Footer());
    CargarCarrito(); 
    botonComprar.onclick = EjecutarCompra;  
    $('#menu-oculto').click(MostrarMenu);
}

const CargarCarrito = () => {
    fetch('https://fakestoreapi.com/products?limit=3')
    .then(res=>res.json())
            .then(data => {
            let contador = 0;
            data.forEach(e => {
                RenderizarProductos(e.id,contador)
                contador++;
            });
            if(contador>0){carritovacio.hide();}
            else{carritoInfo.hide();}
        }
        );
}


const eliminarItem = function (evento) {

      fetch(`https://fakestoreapi.com/products/`+this.id,{
          method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },             
      })
      .then((httpResponse)=>{
          if(httpResponse.ok)
          console.log(httpResponse)
      })
      .then(body => {
          location.reload();
      })
}

const ResumenCompra = (precio, impues,desc) =>{
    precioCarrito.html(`${Redondeo(precio)}`);
    subtotalCarrito.html(`${Redondeo(precio+impues-desc)}`);
    impuesto.html(`${Redondeo(impues)}`);
    descuentoResumen.html(`${Redondeo(desc)}`);
}

const Redondeo = (numero) =>{
    return numero.toLocaleString('fr-FR', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})

}


const RenderizarProductos = (id,incremental) => {
    let query = 'https://fakestoreapi.com/products/'+id
    fetch(query)
    .then(response => response.json())
    .then(e => { 
        let bonificacion = 0;
        if(e.enOferta){bonificacion=15}
        carritoContainer.append(CardCarrito(e.id,e.image,Redondeo(e.price),e.title,bonificacion,e.category,e.description));
        subtotal+= e.price;
        descuento = 0;
        imp=subtotal*0.21
        ResumenCompra(subtotal,imp,descuento);
        botones = document.querySelectorAll(".eliminarBoton");
        botones.forEach(boton => {
            boton.addEventListener("click", eliminarItem);
        });
    });
}

const EjecutarCompra = () => {
    alert('La compra fue realizada con exito.');
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