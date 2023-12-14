const host = 'http://localhost:3000'
const comId = localStorage.getItem('compra')
console.log(comId)
const precio = localStorage.getItem('precio')
console.log(precio)
const usuarioId = localStorage.getItem('user')
console.log(usuarioId)
const pagar = () => {
  const nombre = document.getElementById('nombre').value
  const apellidos = document.getElementById('apellidos').value
  const telefono = document.getElementById('telefono').value
  const email = document.getElementById('email').value.toLowerCase()
  const direccion = document.getElementById('direccion').value.toLowerCase()
  const cp = document.getElementById('cp').value
  const poblacion = document.getElementById('poblacion').value.toLowerCase()
  const provincia = document.getElementById('provincia').value.toLowerCase()
  if (nombre == '' || apellidos == '' || telefono == '' || email == '' || direccion == '' || cp == '' || poblacion == '' || provincia == '') {
    alert('Debes rellenar todos los campos')
  } else {
    fetch(`${host}/direccion/${comId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellidos, telefono, email, direccion, cp, poblacion, provincia })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      if (json.message == 'Compra finalizada') {
        alert(json.message)
        localStorage.removeItem('compra')
        localStorage.setItem('compra', 0)
        localStorage.removeItem('precio')
        window.location.href = '/html/index.html'
      };
    }).catch((error) => {
      console.error(error)
    })
  };
}
const compra = (valor, total) => {
  fetch(`${host}/carrito/${valor}`
  ).then((response) => {
    return response.json()
  }).then((json) => {
    const resumen = document.getElementById('resumen')
    for (let i = 0; i < json.length; i++) {
      resumen.innerHTML += `<div><img  class ="mb-1"src="${json[i].imagen_producto}" alt="" width="100px" height="100px">
            <h6 class="m-1">${json[i].nombre} </h6>
            <div class="d-flex gap-3 align-items-center justify-content-start"><p>${json[i].precio}€</p>
            <p>Cantidad: ${json[i].cantidad}</p></div></div>`
    };
    resumen.innerHTML += `<div><h4>Total: ${precio}€</h4></div>`
  }).catch((error) => {
    HTMLFormControlsCollection.error(error)
  })
}
window.addEventListener('load', compra(comId, precio))
