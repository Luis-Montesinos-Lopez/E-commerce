//Nos cierra sesión
const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('nombre');
    localStorage.removeItem('comId');
    localStorage.removeItem('precio');
    window.location.href = '/html/index.html'
  }