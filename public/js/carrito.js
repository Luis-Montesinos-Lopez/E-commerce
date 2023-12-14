const host = 'http://localhost:3000'

const user = localStorage.getItem('user')
const nombre = localStorage.getItem('name')
console.log(nombre)
const comId = localStorage.getItem('compra')
console.log(comId)
/** ------------------------------------------------Funciones útiles--------------------------------------------------------------------- */
const agregrarPrecio = (precioTotal) => {
  const precio = precioTotal

  fetch(`${host}/precio/${comId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ precio_final: precio })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    console.log(json.message)
    if (json.message == 'Precio añadido') {
      window.location.href = '/html/pago.html'
    };
  }).catch((error) => {
    console.error(error)
  })
}

const compra = (comId) => {
  console.log(comId)
  let precioTotal = 0
  if (comId == null) {
    console.log('Carrito vacío')
    const container = document.getElementById('container')
    container.innerHTML = '<div><h4>Tu carrito está vacío</h4><h6>Échale un ojo a nuestros productos</h6></div>'
  } else {
    fetch(`${host}/carrito/${comId}/`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        if (json.message == 'No hay compra') {
          const container = document.getElementById('container')
          container.innerHTML = '<div class="text-center"><h4>Tu carrito está vacío</h4><h6>Échale un ojo a nuestros productos</h6></div>'
        } else {
          const container = document.getElementById('container')
          for (let i = 0; i < json.length; i++) {
            container.innerHTML += `<div class="cardCarrito p-3 w-25 m-4"><div class="text-center "><img src="${json[i].imagen_producto}"></div><div class="text-center text-nowrap "><h4>${json[i].nombre}</h4></div>
                    <div class="d-flex justify-content-around align-items-center "><h5 class="m-0">${json[i].precio}<span class="m-color"><i class="bi bi-currency-euro"></i></span></h5>
                    <p class="m-0">Cantidad: <i class="bi bi-plus m-color border rounded mx-2" onclick="addCantidad(${comId},${json[i].id},${json[i].cantidad})"></i>${json[i].cantidad}<i class="bi bi-dash m-color border rounded mx-2" onclick="remCantidad(${comId},${json[i].id},${json[i].cantidad})"></i></p></div></div>`
            precioTotal += parseFloat(json[i].precio) * parseInt(json[i].cantidad)
          }
          const total = document.getElementById('total')
          total.innerHTML = `<h4 class="m-0">Subtotal: ${parseFloat(precioTotal.toFixed(2))}€</h4>`
          const btn = document.getElementById('pago')
          btn.innerHTML = `<button class="btn boton" onclick="agregrarPrecio(${precioTotal})">Continuar a forma de pago</button>`
          localStorage.setItem('precio', precioTotal)
        }
      }).catch((error) => {
        console.error(error)
      })
  };
}
const addCantidad = (comId, prodId, cantidad) => {
  fetch(`${host}/addCantidad/${prodId}/${cantidad}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ compra_id: comId })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    if (json.message == 'cantidad actualizada') {
      window.location.href = '/html/carrito.html'
    };
  }).catch((error) => {
    console.error(error)
  })
}

const remCantidad = (comId, prodId, cantidad) => {
  if (cantidad > 1) {
    fetch(`${host}/remCantidad/${prodId}/${cantidad}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ compra_id: comId })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      if (json.message == 'cantidad actualizada') {
        window.location.href = '/html/carrito.html'
      };
    }).catch((error) => {
      console.error(error)
    })
  } else {
    fetch(`${host}/deleteProduct/${prodId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ compra_id: comId })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      if (json.message == 'artículo eliminado del carrito') {
        window.location.href = '/html/carrito.html'
      };
    }).catch((error) => {
      console.error(error)
    })
  }
}
const show = (comId) => {
  if (comId > 0) {
    fetch(`${host}/elementos/${comId}`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        if (json.length != 0) {
          const cantidad = document.getElementById('cantidad')
          cantidad.classList.remove('d-none')
          cantidad.innerHTML = json.cantidad
        };
      }).catch((error) => {
        console.error(error)
      })
  } ;
}
const addName = (name) => {
  const btn = document.getElementById('btn')
  if (nombre) {
    btn.innerHTML = `<div class="d-flex gap-3" ><button class="btn text-end d-flex align-items-center boton mx-3" onclick="paginaUsuario()"><img src="../img/iconos/logging.png" alt="">${nombre}</button><button class="btn text-end d-flex align-items-center boton mx-3 text-nowrap gap-2" onclick="logOut()"><i class="m-color bi bi-power"></i>Cerrar sesión</button></div>`
  } else {
    btn.innerHTML = '<button class="  btn text-end d-flex align-items-center boton mx-3" onclick="login()"><img src="../img/iconos/logging.png" alt="">Iniciar sesion</button>'
  }
}
const login = () => {
  window.location.href = '/html/login.html'
}
const paginaUsuario = () => {
  window.location.href = '/html/usuario.html'
}
const logOut = () => {
  localStorage.clear()
  window.location.href = '/html/index.html'
}
window.addEventListener('load', compra(comId), addName(user), show(comId))
