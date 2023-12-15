const host = 'http://localhost:3000'

const registrar = () => {
  const nombre = document.getElementById('nombre').value
  const precio = document.getElementById('precio').value
  const descrCort = document.getElementById('derc_cor').value
  const img = document.getElementById('img').value
  const descLarg = document.getElementById('desc_lar').value
  const stock = document.getElementById('stock').value
  const cantidad = document.getElementById('cantidad').value
  const ref = document.getElementById('ref').value
  const tipo = document.getElementById('tipo').value
  const oferta = document.getElementById('oferta').value
  console.log(nombre, precio, descrCort, img, descLarg, stock, cantidad, ref, tipo, oferta)
  fetch(`${host}/producto`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      precio,
      descripcion_corta: descrCort,
      imagen_producto: img,
      descripcion_larga: descLarg,
      stock,
      cantidad,
      referencia: ref,
      tipo,
      oferta
    })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    alert(json.message)
    // if (json.message == 'El producto se ha añadido correctamente.') {
    //   window.location.href = '/html/card.html'
    // };
  }).catch((error) => {
    console.error(error)
  })
}
