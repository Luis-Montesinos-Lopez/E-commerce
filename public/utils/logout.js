//Nos cierra sesión
const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('compra');
    localStorage.removeItem('precio');
    window.location.href = '/html/index.html'
    show()
    addName()
  }