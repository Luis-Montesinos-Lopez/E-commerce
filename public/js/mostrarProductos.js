const host = 'http://localhost:3000'
let registrarP = false
let mostrarP = false
/** --------------------------------------------------------Funciones-------------------------------------------------------------- */
/** -----------------------------------------------------Registrar productos------------------------------------------------------------------- */
const registrar = () => {
  const form = document.getElementById('formulario')
  if (!registrarP) {
    form.classList.remove('d-none')
    const enviar = document.getElementById('enviar')
    enviar.innerHTML = '<button class="btn btn-sm boton" onclick="registrarProd()"><i class="bi bi-send"></i></button>'
    registrarP = true
  } else {
    form.classList.add('d-none')
    registrarP = false
  };
}
const registrarProd = () => {
  const nombre = document.getElementById('nombre').value
  const precio = document.getElementById('precio').value
  const desc_cor = document.getElementById('desc_cor').value
  const img = document.getElementById('img').value
  const desc_lar = document.getElementById('desc_lar').value
  const stock = document.getElementById('stock').value
  const cantidad = document.getElementById('cantidad').value
  const ref = document.getElementById('ref').value
  const tipo = document.getElementById('tipo').value
  const oferta = document.getElementById('oferta').value
  const per = document.getElementById('personaje').value
  fetch(`${host}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, precio, descripcion_corta: desc_cor, imagen_producto: img, descripcion_larga: desc_lar, stock, cantidad, referencia: ref, tipo, oferta, personaje: per })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    alert(json.message)
    if (json.message == 'El producto se ha añadido correctamente.') {
      window.location.href = '/html/productos.html'
    };
  }).catch((error) => {
    console.error(error)
  })
}
/** -----------------------------------------Editar productos----------------------------------------------------------------------- */
const editarProducto = (valor) => {
  const prodId = valor
  fetch(`${host}/productos/${prodId}`)
    .then((response) => {
      return response.json()
    }).then((json) => {
      document.getElementById('nombre').value = json.nombre
      document.getElementById('precio').value = json.precio
      document.getElementById('desc_cor').value = json.descripcion_corta
      document.getElementById('img').value = json.imagen_producto
      document.getElementById('desc_lar').value = json.descripcion_larga
      document.getElementById('stock').value = json.stock
      document.getElementById('cantidad').value = json.cantidad
      document.getElementById('ref').value = json.referencia
      document.getElementById('tipo').value = json.tipo
      document.getElementById('oferta').value = json.oferta
      document.getElementById('personaje').value = json.personaje
      document.getElementById('id').value = json.id
      const form = document.getElementById('formulario')
      if (!mostrarP) {
        form.classList.remove('d-none')
        const enviar = document.getElementById('enviar')
        enviar.innerHTML = `<button class="btn btn-sm boton" onclick="editProd(${json.id})"><i class="bi bi-send"></i></button>`
        mostrarP = true
      } else {
        form.classList.add('d-none')
        mostrarP = false
      };
    }).catch((error) => {
      console.error(error)
    })
}
const editProd = (valor) => {
  const prodId = valor
  const nombre = document.getElementById('nombre').value
  const precio = document.getElementById('precio').value
  const desc_cor = document.getElementById('desc_cor').value
  const img = document.getElementById('img').value
  const desc_lar = document.getElementById('desc_lar').value
  const stock = document.getElementById('stock').value
  const cantidad = document.getElementById('cantidad').value
  const ref = document.getElementById('ref').value
  const tipo = document.getElementById('tipo').value
  const oferta = document.getElementById('oferta').value
  const personaje = document.getElementById('personaje').value
  const id = document.getElementById('id').value
  fetch(`${host}/productos/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, precio, descripcion_corta: desc_cor, imagen_producto: img, descripcion_larga: desc_lar, stock, cantidad, referencia: ref, tipo, oferta, personaje })
  }).then((response) => {
    return response.json()
  }).then((json) => {
    alert(json.message)
    if (json.message == 'El producto ha sido actualizado con éxito.') {
      window.location.href = '/html/productos.html'
    } else {
      alert('Ups...Algo ha ido mal')
    }
  }).catch((error) => {
    console.error(error)
  })
}
/** --------------------------------------------------------Mostrar los productos------------------------------------------------------------------------------------------ */
const mostrarProductos = () => {
  fetch(`${host}/productos`)
    .then((response) => {
      return response.json()
    }).then((json) => {
      const products = document.getElementById('container')
      for (let i = 0; i < json.length; i++) {
        products.innerHTML += `<tr><td>${json[i].nombre}</td><td>${json[i].precio}€</td><td>${json[i].descripcion_corta}</td><td><img src="${json[i].imagen_producto}" width="80" Heigth="50"></td>
        <td>${json[i].descripcion_larga}</td><td>${json[i].stock}</td><td>${json[i].cantidad}</td><td>${json[i].referencia}</td><td>${json[i].tipo}</td><td>${json[i].oferta}</td>
        <td><button type="submit" class="btn btn-sm boton" onclick="editarProducto(${json[i].id})"><i class="bi bi-pencil"></i></button></td>
        <td><button type="submit" class="btn btn-sm boton" onclick="eliminarProducto(${json[i].id})"><i class="bi bi-trash3"></i></button></td></tr>`
      };
      const btn = document.getElementById('btn')
      btn.innerHTML = '<button class="btn bnt-sm boton" onclick="registrar()"><i class="bi bi-plus"></i></button>'
    })
}

window.addEventListener('load', mostrarProductos)
const eliminarProducto = (productoID) => {
  confirm('¿Estas seguro de eliminar el producto?')
  console.log(confirm)
}
