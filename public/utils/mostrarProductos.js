const mostrarProductos = async (serie) => {
    const productos = await showTipos(`${serie}`)
    dividir(productos)
  }