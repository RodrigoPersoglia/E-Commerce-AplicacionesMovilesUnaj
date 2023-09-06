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
          <a href="../HTML/index.html"><i class="fas fa-home"></i><p>Home</p></a>
          <a href="../HTML/search.html"><i class="fas fa-sliders-h"></i><p>Busqueda</p></a>
        </div>
        <a id="carrito-link" href="../HTML/carrito.html"><i class="fas fa-shopping-cart"></i><p>Carrito</p></a>
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

    <hr>

    <p>© 2023, Unaj E-Commerce, Inc. Todos los derechos reservados. Unaj, Unaj E-Commerce, 
      el logotipo de Unaj E-Commerce son marcas comerciales o marcas registradas de Unaj 
      Games, Inc. tanto en Estados Unidos de América como en el resto del mundo. Otras marcas o nombres 
      de productos son marcas comerciales de sus respectivos propietarios. Las transacciones fuera de 
      EE. UU. se realizan a través de Unaj International</p>

      <div id="final-links">
        <a href="">Terminos de servicios</a>
        <a href="">Politica de privacidad</a>
        <a href="">Política de reembolso de la tienda</a>
      </div>`
}

export const Card = (id,nombre,descuento,precio,imagenUrl) => {
  return `
    <div class="producto-info-1" onclick="location.href='./product.html?id=${id}'">
      <img src="${imagenUrl}" alt="">
      <div class="producto-info-1-text">
        <h2 id="ofertas-producto-titulo">${nombre}</h2>
        <div class="producto-info-1-precio">
          <h3 class="descuento">${descuento}</h3>
          <h3 id="ofertas-producto-precio">${precio}</h3>
        </div>
      </div>
    </div>
  `
}


export const CardVarios = (id,nombre,precio,imagenUrl) => {
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

export const CardCategory = (nombre,imagenUrl) => {
  return `<a href="./search.html?category=${nombre}"><div class="categorias-populares-subcontainer">
  <div class="categorias-populares-subcontainer-imagenes">
      <img src="${imagenUrl}" alt="producto">
  </div>
  <h3 class="nombre-categoria">${nombre}</h3>
</div></a>`
}

export const CardProductoPrincipal = (nombre,portada,descripcion,precio,categoria,stock) => {
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
      <button id="comprarBTN" class="searchButton">Comprar Ahora</button>
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

export const CardCarrito = (id,portada,precio,nombre,desc,categoria,descripcion) => {
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
                <h5 id="carrito-card-info-desc">${desc}%</h5>
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
                <h2 id="${id}"class="eliminarBoton"
                >Eliminar</h2>
            </div>
        </div>
      </div>`
}
