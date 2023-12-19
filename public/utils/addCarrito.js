const addCarrito = (prodId) => {
  if (user == null) {
    alert('Debes iniciar sesión'),
    window.location.href = '/html/login.html'
  } else {
    if (comId == 0) {
      fetch(`${host}/compraNueva/${user}/${prodId}`, {
        method: 'POST'
      }).then((response) => {
        return response.json()
      }).then((json) => {
        console.log(json)
        localStorage.removeItem('compra')
        localStorage.setItem('compra', `${json.insertId}`)
        const comId = localStorage.getItem('compra')
        console.log(comId)
        fetch(`${host}/addProducto/${comId}/${prodId}`, {
          method: 'POST'
        }).then((response) => {
          return response.json()
        }).then((json) => {
          if (json.message == 'Artículo añadido correctamente') {
            show(comId)
          }
        }).catch((error) => {
          console.error(error)
        })
      }).catch((error) => {
        console.error(error)
      })
    } else {
      fetch(`${host}/addProducto/${comId}/${prodId}`, {
        method: 'POST'
      }).then((response) => {
        return response.json()
      }).then((json) => {
        if (json.message === 'Artículo añadido correctamente' || json.message === 'Artículo actualizado correctamente') {
          show(comId)
        }
      }).catch((error) => {
        console.error(error)
      })
    };
  };
}