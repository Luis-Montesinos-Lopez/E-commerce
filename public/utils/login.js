const host = 'http://localhost:3000'
const login = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if (email == '' || password == '') {
      alert('Todos los campos deben estar rellenos')
    } else {
      fetch(`${host}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }).then((response) => {
        return response.json()
      }).then((json) => {
        console.log(json.message)
        if (json.message != 'El usuario no se encuentra registrado') {
          fetch(`${host}/compra/${json.userId}`)
            .then((response) => {
              return response.json()
            }).then((json) => {
              localStorage.setItem('compra', `${json.id}`)
            }).catch((error) => {
              console.error(error)
            })
          alert('Login correcto')
          localStorage.setItem('user', `${json.userId}`)
          localStorage.setItem('name', `${json.name}`)
          window.location.href = '/html/index.html'
        } else {
          alert('El email no se encuentra registrado')
        }
      })
    };
  }