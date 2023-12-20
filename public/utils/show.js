//Muestra y refresca la compra en el carrito
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