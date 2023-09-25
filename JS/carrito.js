import { NavMenu, NavMenu2, Footer, CardCarrito, modal } from './components.js'

const header = $('#header-page');
const contacto = $('#footer-page');
const carritoContainer = $('#carrito-card-container');
const precioCarrito = $('#precio-total');
const subtotalCarrito = $('#subtotal');
const impuesto = $('#impuesto');
const descuentoResumen = $('#descuento');
const botonComprar = $('#boton-comprar');
const carritovacio = $('#carrito-null');
const carritoInfo = $('#carrito');
const carritoHeader = $('#carrito-header');

var botones = document.querySelectorAll(".eliminarBoton");
var botonesIncrementar = document.querySelectorAll('.incrementar-btn');
var botonesDecrementar = document.querySelectorAll('.decrementar-btn');

let shortMenu = false;

let subtotal = 0;
let imp = 0;
let descuento = 0;

window.onload = () => {
    header.append(NavMenu());
    contacto.append(Footer());
    cargarCarrito();
    inicializar();
    $('#menu-oculto').click(MostrarMenu);
}

const ResumenCompra = (precio, impues, desc) => {
    precioCarrito.html(`${Redondeo(precio)}`);
    subtotalCarrito.html(`${Redondeo(precio + impues - desc)}`);
    impuesto.html(`${Redondeo(impues)}`);
    descuentoResumen.html(`${Redondeo(desc)}`);
}

const Redondeo = (numero) => {
    return numero.toLocaleString('fr-FR', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

}

const actualizarCantidadEnCarrito = (id, nuevaCantidad) => {
    const cantidadElement = document.getElementById(`cantidad-${id}`);
    if (cantidadElement) {
        cantidadElement.textContent = nuevaCantidad;
    }
}

const RenderizarProductos = (id, cantidad) => {
    let query = 'https://fakestoreapi.com/products/' + id;
    fetch(query)
        .then(response => response.json())
        .then(e => {
            const cardHtml = CardCarrito(e.id, e.image, Redondeo(e.price), e.title, e.category, e.description, cantidad);
            const productContainer = document.createElement('div');
            productContainer.classList.add('carrito-product-container');
            productContainer.innerHTML = cardHtml;

            const decrementarButton = productContainer.querySelector('.decrementar');
            decrementarButton.addEventListener('click', () => {
                decrementarProductoDelCarrito(e.id, e.price);
                actualizarCantidadEnCarrito(id, cantidad--);
            });

            const incrementarButton = productContainer.querySelector('.incrementar');
            incrementarButton.addEventListener('click', () => {
                incrementarProductoDelCarrito(e.id, e.price);
                actualizarCantidadEnCarrito(id, cantidad++);
            });

            const eliminarButton = productContainer.querySelector('.eliminarBoton');
            eliminarButton.addEventListener('click', () => {
                eliminarProductoDelCarrito(e.id, e.price);
                actualizarCantidadEnCarrito(id, cantidad);
            });

            carritoContainer.append(productContainer);

            subtotal += cantidad * e.price;
            imp = subtotal * 0.21;
            ResumenCompra(subtotal, imp, descuento);
        });
}

const ReemplazarLocalStorage = (nameItem, list) => {
    localStorage.removeItem(nameItem);
    localStorage.setItem(nameItem, JSON.stringify(list));
}

const decrementarProductoDelCarrito = (productoId, precio) => {
    AumentarDecrementar('carrito', productoId, false, precio);
};

const incrementarProductoDelCarrito = (productoId, precio) => {
    AumentarDecrementar('carrito', productoId, true, precio);
};

const eliminarProductoDelCarrito = (productoId, precio) => {
    Eliminar('carrito', productoId, false, precio)
}


const AumentarDecrementar = (nameItem, idProduct, aumentar, precio) => {
    let carrito = localStorage.getItem(nameItem) ? JSON.parse(localStorage.getItem(nameItem)) : [];
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id == idProduct) {
            if (aumentar) {
                carrito[i].cantidad++;
            } else {
                if (carrito[i].cantidad === 1) {
                    carrito.splice(i, 1);
                } else {
                    carrito[i].cantidad--;
                }
            }
            ReemplazarLocalStorage(nameItem, carrito);
            cargarCarrito();
        }
    }

}

const Eliminar = (nameItem, idProduct) => {
    let carrito = localStorage.getItem(nameItem) ? JSON.parse(localStorage.getItem(nameItem)) : [];
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].id == idProduct) {
            carrito.splice(i, 1);
        }
    }
    ReemplazarLocalStorage(nameItem, carrito);
    cargarCarrito();
}


const cargarCarrito = async () => {
    subtotal = 0;
    imp = 0;
    descuento = 0;
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritovacio = $('#carrito-null')[0];
    const carritoInfo = $('#carrito')[0];

    if (esCarritoVacio()) {
        if (carritovacio) {
            carritovacio.style.display = 'block';
        }
        if (carritoInfo) {
            carritoInfo.style.display = 'none';
        }
    } else {
        if (carritoInfo) {
            carritoInfo.style.display = 'block';
        }
        if (carritovacio) {
            carritovacio.style.display = 'none';
        }

        carritoContainer.html('');

        for (const item of carrito) {
            RenderizarProductos(item.id, item.cantidad);
            actualizarCantidadEnCarrito(item.id);
        }
    }
}
let carrito = [];

const esCarritoVacio = () => {
    return carrito.length === 0;
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

function inicializar() {
    const abrirModalButton = document.getElementById('abrirModal');
    const modalContainer = document.getElementById('modalContainer');

    abrirModalButton.addEventListener('click', () => {
        carritoInfo.hide();
        carritoHeader.hide();
        const modalHTML = modal();
        modalContainer.innerHTML = modalHTML;
        modalContainer.style.display = 'block';

        const comprarButton = modalContainer.querySelector('#comprarButton');
        const cancelarButton = modalContainer.querySelector('#cancelarButton');

        const tarjetaNumeroInput = modalContainer.querySelector("#tarjetaNumero");
        const tarjetaNombreInput = modalContainer.querySelector("#tarjetaNombre");
        const fechaInput = modalContainer.querySelector("#fechaInput");
        const codigoInput = modalContainer.querySelector("#codigo");
        const tarjetaNumeroElement = modalContainer.querySelector("#idTarjetaNumero");
        const tarjetaNombreElement = modalContainer.querySelector("#idNombre");
        const fechaElement = modalContainer.querySelector("#idFecha");
        const codigoElement = modalContainer.querySelector("#idCvv");

        tarjetaNumeroInput.addEventListener("input", () => {
            const numeroTarjeta = tarjetaNumeroInput.value;
            const numeroLimpio = numeroTarjeta.replace(/\D/g, '');
            const ultimosCuatroDigitos = numeroLimpio.slice(-4);
            const asteriscos = numeroLimpio.length >= 4 ? '*'.repeat(numeroLimpio.length - 4) : '';
            let numeroCompleto = '';
            for (let i = 0; i < asteriscos.length; i += 4) {
                numeroCompleto += asteriscos.slice(i, i + 4) + ' ';
            }
            numeroCompleto += ultimosCuatroDigitos;
            tarjetaNumeroElement.textContent = numeroCompleto;
        });

        tarjetaNombreInput.addEventListener("input", () => {
            const nombreCompleto = tarjetaNombreInput.value;
            const nombreEnMayusculas = nombreCompleto.toUpperCase();
            tarjetaNombreElement.textContent = nombreEnMayusculas;
        });

        fechaInput.addEventListener("input", () => {
            let fecha = fechaInput.value.replace(/\D/g, '');
            if (fecha.length >= 4) {
                fecha = fecha.slice(0, 2) + '/' + fecha.slice(2, 4);
            }
            fechaElement.textContent = fecha;
        });

        codigoInput.addEventListener("input", () => {
            codigoElement.textContent = codigoInput.value;
        });

        comprarButton.addEventListener('click', () => {
            validarCompra();
        });

        cancelarButton.addEventListener('click', () => {
            modalContainer.style.display = 'none';
            carritoInfo.show();
            carritoHeader.show();
        });
    });
    window.addEventListener('click', (evento) => {
        if (evento.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    function validarCompra() {
        const tarjetaNumeroInput = document.getElementById("tarjetaNumero");
        const tarjetaNombreInput = document.getElementById("tarjetaNombre");
        const fechaInput = document.getElementById("fechaInput");
        const codigoInput = document.getElementById("codigo");
        const emailInput = document.getElementById('e-mail').value;
        const dniInput = document.getElementById('dni').value;

        const emailError = document.getElementById('email-error');
        const tarjetaError = document.getElementById('numero-error');
        const nombreError = document.getElementById('nombre-error');
        const fechaError = document.getElementById('fecha-error');
        const codigoError = document.getElementById('codigo-error');
        const dniError = document.getElementById('dni-error');

        emailError.textContent = '';
        tarjetaError.textContent = '';
        nombreError.textContent = '';
        fechaError.textContent = '';
        codigoError.textContent = '';
        dniError.textContent = '';

        if (emailInput === '') {
            emailError.textContent = 'El campo de correo electrónico es requerido';
            document.querySelector('.span-mail').style.display = 'none';
        } else if (!ValidarMail(emailInput)) {
            emailError.textContent = 'El correo electrónico es inválido';
            document.querySelector('.span-mail').style.display = 'none';

        }

        if (tarjetaNumeroInput.value === '') {
            tarjetaError.textContent = 'El campo número de tarjeta es requerido';
            document.querySelector('.span-tarjeta').style.display = 'none';
        } else if (!ValidarTarjeta(tarjetaNumeroInput.value)) {
            tarjetaError.textContent = 'El número de tarjeta es inválido';
            document.querySelector('.span-tarjeta').style.display = 'none';
        }

        if (tarjetaNombreInput.value === '') {
            nombreError.textContent = 'El campo de nombre es requerido';
            document.querySelector('.span-nombre').style.display = 'none';
        } else if (!ValidarNombre(tarjetaNombreInput.value)) {
            nombreError.textContent = 'El nombre debe contener solo letras';
            document.querySelector('.span-nombre').style.display = 'none';
        }

        if (fechaInput.value === '') {
            fechaError.textContent = 'El campo de fecha es requerido';
            document.querySelector('.span-fecha').style.display = 'none';
        } else {
            const [mes, año] = fechaInput.value.split('/').map(Number);
            if (isNaN(mes) || isNaN(año) || mes < 1 || mes > 12 || año < 23 || año > 30) {
                fechaError.textContent = 'Fecha inválida.';
                document.querySelector('.span-fecha').style.display = 'none';
            }
        }

        if (codigoInput.value === '') {
            codigoError.textContent = 'El campo código de seguridad es requerido';
            document.querySelector('.span-codigo').style.display = 'none';
        } else if (!ValidarCode(codigoInput.value)) {
            codigoError.textContent = 'El número de tarjeta es inválido';
            document.querySelector('.span-codigo').style.display = 'none';
        }

        if (dniInput === '') {
            dniError.textContent = 'El campo DNI es requerido';
            document.querySelector('.span-dni').style.display = 'none';
        } else if (!ValidarDNI(dniInput)) {
            dniError.textContent = 'El DNI es inválido';
            document.querySelector('.span-dni').style.display = 'none';
        }

        if (emailError.textContent === '' && tarjetaError.textContent === '' &&
            nombreError.textContent === '' && fechaError.textContent === '' &&
            codigoError.textContent === '' && dniError.textContent === '') {
            
            modalContainer.style.display = 'none';
            enviarCorreo(emailInput);
            localStorage.removeItem('carrito');
            cargarCarrito();
            window.scrollTo(0,0)
        }
    }
    function ValidarMail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    function ValidarTarjeta(numeroTarjeta) {
        const limpiarTarjeta = numeroTarjeta.replace(/\D/g, '');
        return limpiarTarjeta.length === 16;
    }

    function ValidarNombre(nombre) {
        const nombreRegex = /^[a-zA-Z\s]+$/;
        return nombreRegex.test(nombre);
    }

    function ValidarCode(codeSecurity) {
        const limpiarCode = codeSecurity.replace(/\D/g, '');
        return limpiarCode.length === 3;
    }

    function ValidarDNI(dni) {
        const limpiar = dni.replace(/\D/g, '');
        return limpiar.length >= 7 && limpiar.length <= 8;
    }
    function enviarCorreo(destinatario) {
        const asunto = 'E-Commerce Unaj';
        const precioTotal = precioCarrito.html();
        const subtotal = subtotalCarrito.html();
        const impuestoTotal = impuesto.html();
    
        const cuerpoMensaje = `
    Estimado cliente,
    
    Usted ha realizado la compra con éxito. A continuación, se muestra el resumen de su compra:
    - Subtotal: ${precioTotal.replace(/&nbsp;/g, ' ')}
    - Impuesto: ${impuestoTotal.replace(/&nbsp;/g, ' ')}
    - Precio Total: ${subtotal.replace(/&nbsp;/g, ' ')}
    
    Gracias por elegir E-Commerce Unaj.
    `;
    
        const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoMensaje)}`;
        window.location.href = mailtoLink;
    }

}

