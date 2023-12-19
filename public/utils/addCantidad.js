const addCantidad = (comId, prodId, cantidad) => {
    fetch(`${host}/addCantidad/${prodId}/${cantidad}`, {
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
  }