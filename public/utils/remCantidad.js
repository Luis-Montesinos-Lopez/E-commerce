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
          refresh(comId)
          show(comId)
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
          window.location.href='/html/carrito.html'
          
        };
      }).catch((error) => {
        console.error(error)
      })
    }
  }