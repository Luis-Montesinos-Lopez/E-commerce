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