const mostrarProductos = async (serie) => {
  const productos = await showTipos(`${serie}`)

  dividir(productos)
}
const insertar = (lista, personaje) => {
  const Personaje = document.getElementById(`${personaje}`)
  for (let i = 0; i < lista.length; i++) {
    if (i === 3) {
      Personaje.innerHTML += `<div class="w-100"></div>
                <div class="card col-6 col-sm-3" >
            <img src="${lista[i].imagen_producto}" class="card-img-top" alt="..."><i class="bi bi-zoom-in m-color"></i>
            <div class="card-body">
              <h5 class="h5">${lista[i].nombre}</h5>
              <div class="precio">
                <h5>${lista[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${lista[i].id})">¡Lo quiero!</button>
            </div>
            </div>
          </div>`
    } else {
      Personaje.innerHTML += ` <div class="card col-6 col-sm-3" >
            <img src="${lista[i].imagen_producto}" class="card-img-top" alt="..."><i class="bi bi-zoom-in m-color"></i>
            <div class="card-body">
              <h5 class="h5">${lista[i].nombre}</h5>
              <div class="precio">
                <h5>${lista[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${lista[i].id})">¡Lo quiero!</button>
            </div>
            </div>
          </div>`
    };
  };
}
const dividir = (listado) => {
  const luffy = []
  const zoro = []
  const sanji = []
  const nami = []
  const chopper = []
  const law = []
  for (let i = 0; i < listado.length; i++) {
    if (listado[i].personaje === 'luffy') {
      luffy.push(listado[i])
    } else if (listado[i].personaje === 'zoro') {
      zoro.push(listado[i])
    } else if (listado[i].personaje === 'sanji') {
      sanji.push(listado[i])
    } else if (listado[i].personaje === 'nami') {
      nami.push(listado[i])
    } else if (listado[i].personaje === 'chopper') {
      chopper.push(listado[i])
    } else if (listado[i].personaje === 'law') {
      law.push(listado[i])
    };
  };
  console.log(luffy, zoro, sanji, nami, chopper, law)
  insertar(luffy, 'luffy')
  insertar(zoro, 'zoro')
  insertar(sanji, 'sanji')
  insertar(nami, 'nami')
  insertar(chopper, 'chopper')
  insertar(law, 'law')
}
const addCarrito = (prodId) => {
  if (user == null) {
    alert('Debes iniciar sesión'),
    window.location.href = '/html/login.html'
  } else {
    if (comId == 0) {
      fetch(`${host}/compraNueva/${user}/${prodId}`, {
        method: 'POST'
      }).then((response) => {
        return response.json()
      }).then((json) => {
        console.log(json)
        localStorage.removeItem('compra')
        localStorage.setItem('compra', `${json.insertId}`)
        const comId = localStorage.getItem('compra')
        console.log(comId)
        fetch(`${host}/addProducto/${comId}/${prodId}`, {
          method: 'POST'
        }).then((response) => {
          return response.json()
        }).then((json) => {
          if (json.message == 'Artículo añadido correctamente') {
            window.location.href = '/html/onepiece.html'
          }
        }).catch((error) => {
          console.error(error)
        })
      }).catch((error) => {
        console.error(error)
      })
    } else {
      fetch(`${host}/addProducto/${comId}/${prodId}`, {
        method: 'POST'
      }).then((response) => {
        return response.json()
      }).then((json) => {
        if (json.message === 'Artículo añadido correctamente' || json.message === 'Artículo actualizado correctamente') {
          window.location.href = '/html/onepiece.html'
        }
      }).catch((error) => {
        console.error(error)
      })
    };
  };
}

window.addEventListener('load', mostrarProductos('onepiece'))
