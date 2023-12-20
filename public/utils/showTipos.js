//Busca en base de datos una lista de productos en específico
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