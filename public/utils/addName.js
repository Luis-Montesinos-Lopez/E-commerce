//Muestra el nombre del usuario en el header
const addName = (name) => {
  const btn = document.getElementById('btn')
  if (name != null) {
    btn.innerHTML = `<div class="d-flex gap-3" ><button class="btn text-end d-flex align-items-center boton mx-3" onclick="paginaUsuario()"><img src="../img/iconos/logging.png" alt="">${name}</button><button class="btn text-end d-flex align-items-center boton mx-3 text-nowrap gap-2" onclick="logOut()"><i class="m-color bi bi-power"></i>Cerrar sesión</button></div>`
  } else {
    btn.innerHTML = '<button class="  btn text-end d-flex align-items-center boton mx-3" onclick="login()"><img src="../img/iconos/logging.png" alt="">Iniciar sesion</button>'
  }
}