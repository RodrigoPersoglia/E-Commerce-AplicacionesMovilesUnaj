import {NavMenu,Footer,CardCarrito} from './components.js'

const header = document.getElementById("Menu");
const contacto = document.getElementById("Contacto");
const carritoContainer = document.getElementById("carrito-card-container");
const precioCarrito = document.getElementById("precio-total");
const subtotalCarrito = document.getElementById("subtotal");
const impuesto= document.getElementById("impuesto");
const descuentoResumen= document.getElementById("descuento");
const botonComprar= document.getElementById("boton-comprar");
const carritovacio= document.getElementById("carrito-null");
const carritoInfo= document.getElementById("carrito");
var botones = document.querySelectorAll(".eliminarBoton");


let subtotal = 0;
let imp=0;
let descuento=0;

window.onload = () => {
    header.innerHTML=NavMenu();
    contacto.innerHTML=Footer();
    CargarCarrito(); 
    botonComprar.onclick = EjecutarCompra;  
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
            if(contador>0){carritovacio.style.display = 'none';}
            else{carritoInfo.style.display = 'none';}
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
    precioCarrito.innerHTML=(`${Redondeo(precio)}`);
    subtotalCarrito.innerHTML=(`${Redondeo(precio+impues-desc)}`);
    impuesto.innerHTML=(`${Redondeo(impues)}`);
    descuentoResumen.innerHTML = (`${Redondeo(desc)}`);
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
        carritoContainer.innerHTML+=CardCarrito(e.id,e.image,Redondeo(e.price),e.title,bonificacion,e.category,e.description)
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
