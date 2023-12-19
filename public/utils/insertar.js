
const insertar = (lista, personaje) => {
  const Personaje = document.getElementById(`${personaje}`)
  for (let i = 0; i < lista.length; i++) {
    if (i === 3) {
      if(lista[i].oferta===1){
        Personaje.innerHTML += `<div class="w-100"></div>
                <div class="card col-6 col-sm-3" >
            <img src="${lista[i].imagen_producto}" class="card-img-top" alt="..."><span class="badge text-bg-success">Oferta</span>
            <div class="card-body">
              <h5 class="h5">${lista[i].nombre}</h5>
              <div class="precio">
                <h5>${lista[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${lista[i].id})">¡Lo quiero!</button>
                <button class="boton" onclick="infoProducto(${lista[i].id})">¡Más Info!</button>
            </div>
            </div>
          </div>`
      }else{
        Personaje.innerHTML += `<div class="w-100"></div>
                <div class="card col-6 col-sm-3" >
            <img src="${lista[i].imagen_producto}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="h5">${lista[i].nombre}</h5>
              <div class="precio">
                <h5>${lista[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${lista[i].id})">¡Lo quiero!</button>
                <button class="boton" onclick="infoProducto(${lista[i].id})">¡Más Info!</button>
            </div>
            </div>
          </div>`
      }
    } else {
      if(lista[i].oferta===1){
        Personaje.innerHTML += `
                <div class="card col-6 col-sm-3" >
            <img src="${lista[i].imagen_producto}" class="card-img-top" alt="..."><span class="badge text-bg-success">Oferta</span>
            <div class="card-body">
              <h5 class="h5">${lista[i].nombre}</h5>
              <div class="precio">
                <h5>${lista[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${lista[i].id})">¡Lo quiero!</button>
                <button class="boton" onclick="infoProducto(${lista[i].id})">¡Más Info!</button>
            </div>
            </div>
          </div>`
      }else{
        Personaje.innerHTML += ` <div class="card col-6 col-sm-3" >
                      <img src="${lista[i].imagen_producto}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="h5">${lista[i].nombre}</h5>
                        <div class="precio">
                          <h5>${lista[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                          <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
                      </div>
                      <div class="comprar">
                          <button class="boton" onclick="addCarrito(${lista[i].id})">¡Lo quiero!</button>
                          <button class="boton" onclick="infoProducto(${lista[i].id})">¡Más Info!</button>
                      </div>
                      </div>
                    </div>`
      }
      
    };
  };
}