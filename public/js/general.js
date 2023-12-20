const host = 'http://localhost:3000'
const user = localStorage.getItem('user')
const nombre = localStorage.getItem('name')
const comId = localStorage.getItem('compra')
/* -----------------------------------------------Funciones carrito------------------------------------------------------------------- */



window.addEventListener('load', show(comId), addName(nombre))
