export const NavMenu = () => {
  return `<div id="top-header">
        <div id="logo">
            <img src="../Imagenes/logo.png" alt="logo">
            <h1>Unaj E-Commerce</h1>
        </div>
    </div>
    <div id="fixed-header-container">
        <div id="fixed-header">
          <form class="search-bar" action="./search.html?">
            <input id="Busqueda" type="text" placeholder="Buscar..." name="product">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
          <a class="opcionesMenu" href="../HTML/index.html"><i class="fas fa-home"></i><p>Home</p></a>
          <a class="opcionesMenu" href="../HTML/search.html"><i class="fas fa-sliders-h"></i><p>Busqueda</p></a>
        </div>
        <a class="opcionesMenu" id="carrito-link" href="../HTML/carrito.html"><i class="fas fa-shopping-cart"></i><p>Carrito</p></a>
        <i id="menu-oculto" class="fas fa-bars"></i>
    </div>`
}

export const NavMenu2 = () => {
  return `<div id="top-header">
      <div id="logo">
          <img src="../Imagenes/logo.png" alt="logo">
          <h1>Unaj E-Commerce</h1>
      </div>
  </div>
  <div id="header-container">      
        <a class="opcionesMenu2" href="../HTML/index.html"><i class="fas fa-home"></i><p>Home</p></a>
        <a class="opcionesMenu2" href="../HTML/search.html"><i class="fas fa-sliders-h"></i><p>Busqueda</p></a>
        <a class="opcionesMenu2" id="carrito-link" href="../HTML/carrito.html"><i class="fas fa-shopping-cart"></i><p>Carrito</p></a> 
        <a id="menu-oculto" class="opcionesMenu2" href="#"><i class="fas fa-times"></i><p>Cerrar</p></a>
  </div>`
}

export const Footer = () => {
  return `<div id="redes-logos">
      <a Target="_blank" href="https://www.twitter.com"><i class="fab fa-twitter"></i></a>
      <a Target="_blank" href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
      <a Target="_blank" href="https://www.facebook.com"><i class="fab fa-facebook-f"></i></a>
    </div>

    <h2>Recursos</h2>
    <div class="links-container">
      <div>
        <a href="">Apoya a un creador</a>
        <a href="">Publica en Unaj</a>
        <a href="">Empleo</a>
        <a href="">Compañia</a>
      </div>
      <div>
        <a href="">Política de arte de aficionados</a>
        <a href="">Estudio de experiencias de usuarios</a>
        <a href="">CLUF de la tienda</a>
        <br>
        <a href="">Servicios en línea</a>
        <a href="">Reglas de la comunidad</a>
      </div>
    </div>

    <h2>Creado por Unaj Factory</h2>
    <div class="links-container">
      <div>
        <a href="">Rodrigo Persoglia</a>
      </div>
      <div>
        <a href="">Gerónimo Bazan</a>
      </div>
    </div>
    <div class="map-conteiner">
     <h2>Visitanos</h2>
      <div id="mi_mapa" style="width: 250px; height: 250px;"></div>
    </div>
    <hr>

    <p>© 2023, Unaj E-Commerce, Inc. Todos los derechos reservados. Unaj, Unaj E-Commerce, 
      el logotipo de Unaj E-Commerce son marcas comerciales o marcas registradas de Unaj 
      , Inc. tanto en Estados Unidos de América como en el resto del mundo. Otras marcas o nombres 
      de productos son marcas comerciales de sus respectivos propietarios. Las transacciones fuera de 
      EE. UU. se realizan a través de Unaj International</p>

      <div id="final-links">
        <a href="">Terminos de servicios</a>
        <a href="">Politica de privacidad</a>
        <a href="">Política de reembolso de la tienda</a>
      </div>
      
      <script>
        let map = L.map('mi_mapa').setView([-34.77512, -58.26872], 14)
  
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  
        L.marker([-34.77512, -58.26872]).addTo(map).bindPopup("Universidad Nacional Arturo Jauretche")
    </script>`
}

export const Card = (id, nombre, precio, imagenUrl) => {
  return `
    <div class="producto-info-1" onclick="location.href='./product.html?id=${id}'">
      <img src="${imagenUrl}" alt="">
      <div class="producto-info-1-text">
        <h2 id="ofertas-producto-titulo">${nombre}</h2>
        <div class="producto-info-1-precio">
          <h3 id="ofertas-producto-precio">${precio}</h3>
        </div>
      </div>
    </div>
  `
}


export const CardVarios = (id, nombre, precio, imagenUrl) => {
  return `<div class="varios-" onclick="location.href='./product.html?id=${id}'">
  <img src="${imagenUrl}" alt="">
  <div class="varios--info">
    <h2>${nombre}</h2>
    <div class="varios--info-precio">
      <h3>${precio}</h3>
    </div>
  </div>
</div>`
}

export const CardCategory = (nombre, imagenUrl) => {
  return `<a href="./search.html?category=${nombre}"><div class="categorias-populares-subcontainer">
  <div class="categorias-populares-subcontainer-imagenes">
      <img src="${imagenUrl}" alt="producto">
  </div>
  <h3 class="nombre-categoria">${nombre}</h3>
</div></a>`
}

export const CardProductoPrincipal = (nombre, portada, descripcion, precio, categoria, stock, textButton) => {
  return `<div id="producto">
  <div class="producto-header">
    <h2>${nombre}</h2>
    <img src="${portada}" alt="Icono del Producto">
    <div class="descripcion">
        <h3>Descripcion:</h3>
        <p>${descripcion}</p>
    </div>
  </div>
  <div id="info-producto">
  
  <div id="precio">
      <h2>${precio}</h2>
  </div>
  <div id="botones">
      <button id="favoritosBTN" class="searchButton">${textButton}</button>
      <button id="addBTN"  class="searchButton">Añadir al Carrito</button>
  </div>
  <div id="caracteristicas">
      <h3>Características</h3>
      <hr>
      <div class="caracteristicas"><p>Categorias:</p><span>${categoria}</span></div>
      <hr>
      <div class="caracteristicas"><p>Stock:</p><span>${stock}</span></div>
      <hr>
  </div>
</div>

</div>`
}

export const CardCarrito = (id, portada, precio, nombre, categoria, descripcion, cantidad) => {
  return `
      <div class="carrito-card">
        <div class="carrito-card-imagen">
            <img onclick="" src="${portada}" alt="portada">
        </div>
        <div class="carrito-card-content">

            <div class="carrito-card-header">
                <div class="carrito-card-info-categoria">
                    <h3>${categoria}</h3>
                </div>
                <div class="carrito-card-header-precio">
                <h2 id="carrito-card-info-precio">${precio}</h2>
              </div>
            </div>
            <div class="carrito-card-info">
                <h2 id="carrito-card-info-titulo" onclick="">${nombre}</h2>
                <div class="carrito-card-info-clasificacion">

                    <div class="clasificacion-info">
                        <h3>${descripcion}</h3>
                    </div>
                </div>
            </div>
            <div class="carrito-card-footer">
                <div class="cantidad-carrito">
                <button class="decrementar" data-id="${id}">-</button>
                <div class="cantidad" id="cantidad-${id}">${cantidad}</div>
                <button class="incrementar" data-id="${id}">+</button>
                </div>
                <h2 id="${id}"class="eliminarBoton">Eliminar</h2>
            </div>
        </div>
      </div>`
}

export const CardHistorial = (id,titulo, imagenUrl) => {
  return `<div class="recientes" onclick="location.href='./product.html?id=${id}'">
            <div class="recientes-body">
              <img src="${imagenUrl}" alt="${titulo}">
            </div>
            <div class="recientes-footer">
              <h3>${titulo}</h3>
            </div>
          </div>`
}

export const modal =()=>
{
    return `
    <div id="modalMain" class="modal">
        <div class="modal-content">
            <div class="container">
                <div class="form">
                    <h2>Formulario de Compra</h2>
                    <form>
                        <div class="form-group">
                            <label for="e-mail">Email</label>
                            <input type="text" id="e-mail" class="e-mail" placeholder="micorreo@mail.com" required>
                            <span class="span-mail">Ingrese su direccion de mail.</span>
                            <div id="email-error" class="error"></div>
                        </div>

                        <div class="form-group">
                            <label for="tarjetaNumero">Número de tarjeta</label>
                            <input type="text" id="tarjetaNumero" class="card-number" placeholder="**** **** **** ****" minlength="16" maxlength="16" required>
                            <span class="span-tarjeta">Ingrese los 16 digitos de su tarjeta.</span>
                            <div id="numero-error" class="error"></div>
                        </div>

                        <div class="form-group">
                            <label for="tarjetaNombre">Nombre y apellido</label>
                            <input type="text" id="tarjetaNombre" class="tarjetaNombre" placeholder="Nombre Apellido" required>
                            <span class="span-nombre">Tal cual esté impreso en la tarjeta.</span>
                            <div id="nombre-error"class="error"></div>
                        </div>

                        <div class="fecha-codigo">
                            <div class="form-group">
                                <label for="fecha">Fecha de vencimiento</label>
                                <input type="text" id="fechaInput" class="card-fecha" placeholder="MM/AA" required>
                                <span class="span-fecha">Mes/año</span>
                                <div id="fecha-error" class="error"></div>
                            </div>
                            <div class="form-group">
                                <label for="codigo">Código de seguridad</label>
                                <input type="text" id="codigo" class="card-cvv" placeholder="***" minlength="3" maxlength="3" required>
                                <span class="span-codigo">Los 3 números del dorso de tu tarjeta</span>
                                <div id="codigo-error" class="error"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="dni">DNI del titular de la tarjeta</label>
                            <input type="text" id="dni" minlength="7" maxlength="8" required>
                            <span class="span-dni">Ingrese su dni</span>
                            <div id="dni-error" class="error"></div>
                        </div>
                    </form>
                    <button id="comprarButton">Finalizar Compra</button>
                    <button id="cancelarButton">Cancelar</button>
                </div>
                <div class="card">
                    <div id="tarjetaDatos">
                        <div class="tarjeta-numero-container">
                            <p id="idTarjetaNumero" class="tarjeta-numero"></p>
                        </div>
                        <div class="tarjeta-detalles">
                            <p id="idNombre" class="tarjeta-nombre">Nombre Apellido</p>
                            <p id="idFecha" class="tarjeta-fecha">MM/AA</p>
                            <p id="idCvv" class="tarjeta-cvv">***</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}