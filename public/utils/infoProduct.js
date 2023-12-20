//Nos lleva a la página de cada producto con su información
const infoProducto=(prodId)=>{
    localStorage.setItem('infoProd',prodId)
    window.location.href='/html/infoProducto.html'
  }