const host = 'http://localhost:3000'
const user = localStorage.getItem('user')
const nombre = localStorage.getItem('name')
const comId = localStorage.getItem('compra')
console.log(comId)
/* -----------------------------------------------Funciones carrito------------------------------------------------------------------- */
const show = (comId) => {
  if (comId > 0) {
    fetch(`${host}/elementos/${comId}`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        if (json.length != 0) {
          console.log(json)
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
window.addEventListener('load', show(comId), addName(nombre))
