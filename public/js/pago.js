const host = 'http://localhost:3000'
const comId = localStorage.getItem('compra')
console.log(comId)
const precio = localStorage.getItem('precio')
console.log(precio)
let tarjeta = false
const usuarioId = localStorage.getItem('user')
console.log(usuarioId)

const addCard = () => {
  const n_tarjeta = document.getElementById('numTarjeta').value
  const cad = document.getElementById('cad').value
  const titular = document.getElementById('titular').value
  const cvv = document.getElementById('cvv').value
  if (n_tarjeta == '' || cad == '' || titular == '' || cvv == '') {
    alert('Debe introducir una tarjeta válida')
  } else {
    fetch(`${host}/tarjeta/${comId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ caducidad: cad, cvv })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json.message)
      if (json.message == 'Forma de pago añadida') {
        window.location.href = '/html/pedido.html'
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}

const showCards = (id) => {
  const userId = id
  fetch(`${host}/tarjetas/${userId}`)
    .then((response) => {
      return response.json()
    }).then((json) => {
      const seleccion = document.getElementById('seleccion')
      for (let i = 0; i < json.length; i++) {
        seleccion.innerHTML += `<option value="${json[i].id}" id="${json[i].id}">${json[i].n_tarjeta}</option>`
      };
      const btn = document.getElementById('btn')
      btn.innerHTML = '<button class="btn boton" onclick="addCard()">Añadir dirección de envío</button>'
    }).catch((error) => {
      console.error(error)
    })
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
window.addEventListener('load', showCards(usuarioId), compra(comId, precio))

const select = document.getElementById('seleccion')
select.addEventListener('change', (event) => {
  const cardId = event.target.value
  fetch(`${host}/tarjeta/${cardId}`
  ).then((response) => {
    return response.json()
  }).then((json) => {
    document.getElementById('numTarjeta').value = json.n_tarjeta
    document.getElementById('titular').value = json.titular_tarjeta
    document.getElementById('cad').value = json.caducidad
  }).catch((error) => {
    console.error(error)
  })
})
const registrartarjeta = () => {
  const n_tarjeta = document.getElementById('nuevaTarjeta').value
  const titular = document.getElementById('n_titular').value
  const cad = document.getElementById('n_cad').value
  const cvv = document.getElementById('n_cvv').value

  fetch(`${host}/tarjetas/${usuarioId}/${n_tarjeta}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ usuario_id: usuarioId, n_tarjeta, titular_tarjeta: titular, caducidad: cad, cvv })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    alert(json.message)
    if (json.message == 'Tarjeta añadida.') {
      window.location.href = '/html/pago.html'
    }
  }).catch((error) => {
    console.error(error)
  })
}
const n_tarjeta = () => {
  const nCard = document.getElementById('nTarjeta')
  const card = document.getElementById('tarjeta')
  const add = document.getElementById('addCard')
  if (!tarjeta) {
    nCard.classList.remove('d-none')
    add.innerHTML = '<button class="btn btn-sm boton my-3" onclick="registrartarjeta()">Añadir tarjeta</button>'
    card.classList.add('d-none')
    tarjeta = true
  } else {
    nCard.classList.add('d-none')
    card.classList.remove('d-none')
    tarjeta = false
  };
}
