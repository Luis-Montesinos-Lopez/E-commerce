const host = 'http://localhost:3000'
const user = localStorage.getItem('user')
const nombre = localStorage.getItem('name')
const comId = localStorage.getItem('compra')
/* -----------------------------------------------Funciones carrito------------------------------------------------------------------- */
const show = (comId) => {
  if (comId > 0) {
    fetch(`${host}/elementos/${comId}`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        if (json.length != 0) {
          if (json.cantidad != null) {
            const cantidad = document.getElementById('cantidad')
            cantidad.classList.remove('d-none')
            cantidad.innerHTML = json.cantidad
          }
        };
      }).catch((error) => {
        console.error(error)
      })
  } ;
}
const showTipos = async (serie) => {
  return fetch(`${host}/productosTipo/${serie}`)
    .then((response) => {
      return response.json()
    }).then((json) => {
      return json
    }).catch((error) => {
      console.error(error)
    })
}
const addName = (name) => {
  const btn = document.getElementById('btn')
  if (name != null) {
    btn.innerHTML = `<div class="d-flex gap-3" ><button class="btn text-end d-flex align-items-center boton mx-3" onclick="paginaUsuario()"><img src="../img/iconos/logging.png" alt="">${name}</button><button class="btn text-end d-flex align-items-center boton mx-3 text-nowrap gap-2" onclick="logOut()"><i class="m-color bi bi-power"></i>Cerrar sesión</button></div>`
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
const refresh=(comId)=>{
  let precioTotal = 0
  fetch(`${host}/carrito/${comId}`)
  .then((response)=>{
    return response.json()
  }).then((json)=>{
    if(json.length>0){
      const container = document.getElementById('container')
    container.innerHTML=""
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
    }else{
      const container = document.getElementById('container')
    container.innerHTML = '<div><h4>Tu carrito está vacío</h4><h6>Échale un ojo a nuestros productos</h6></div>'
    }
    
  }).catch((error)=>{
    console.error(error)
  })
}
const infoProducto=(prodId)=>{
  localStorage.setItem('infoProd',prodId)
  window.location.href='/html/infoProducto.html'
}

window.addEventListener('load', show(comId), addName(nombre))
