 const showOfertas = () => {
    fetch(`${host}/ofertas`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        const onepiece = []
        const kimetsu = []
        const jujutsu = []
        const naruto = []
        const hero = []
        const dragonball = []
        for (let i = 0; i < json.length; i++) {
          if (json[i].tipo == 'onepiece') {
            onepiece.push(json[i])
          } else if (json[i].tipo == 'kimetsu') {
            kimetsu.push(json[i])
          } else if (json[i].tipo == 'jujutsu') {
            jujutsu.push(json[i])
          } else if (json[i].tipo == 'naruto') {
            naruto.push(json[i])
          } else if (json[i].tipo == 'hero') {
            hero.push(json[i])
          } else if (json[i].tipo == 'dragonball') {
            dragonball.push(json[i])
          };
        };
        insertar(onepiece, 'onepiece')
        insertar(kimetsu, 'kimetsu')
        insertar(jujutsu, 'jujutsu')
        insertar(naruto, 'naruto')
        insertar(hero, 'hero')
        insertar(dragonball, 'dragonball')
      }).catch((error) => {
        console.error(error)
      })
  }