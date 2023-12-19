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