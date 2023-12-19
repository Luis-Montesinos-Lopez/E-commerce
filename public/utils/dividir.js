const dividir = (listado) => {
        const onepiece = []
        const kimetsu = []
        const jujutsu = []
        const naruto = []
        const hero = []
        console.log(hero)
        const dragonball = []
        for (let i = 0; i < listado.length; i++) {
          if (listado[i].tipo == 'onepiece') {
            onepiece.push(listado[i])
          } else if (listado[i].tipo == 'kimetsu') {
            kimetsu.push(listado[i])
          } else if (listado[i].tipo == 'jujutsu') {
            jujutsu.push(listado[i])
          } else if (listado[i].tipo == 'naruto') {
            naruto.push(listado[i])
          } else if (listado[i].tipo == 'hero') {
            hero.push(listado[i])
          } else if (listado[i].tipo == 'dragonball') {
            dragonball.push(listado[i])
          };
        };
        if (onepiece.length >0){
          const luffy = []
  const zoro = []
  const sanji = []
  const nami = []
  const chopper = []
  const law = []
  for (let i = 0; i < onepiece.length; i++) {
    if (onepiece[i].personaje === 'luffy') {
      luffy.push(onepiece[i])
    } else if (onepiece[i].personaje === 'zoro') {
      zoro.push(onepiece[i])
    } else if (onepiece[i].personaje === 'sanji') {
      sanji.push(onepiece[i])
    } else if (onepiece[i].personaje === 'nami') {
      nami.push(onepiece[i])
    } else if (onepiece[i].personaje === 'chopper') {
      chopper.push(onepiece[i])
    } else if (onepiece[i].personaje === 'law') {
      law.push(onepiece[i])
    };
  };
  insertar(luffy, 'luffy')
  insertar(zoro, 'zoro')
  insertar(sanji, 'sanji')
  insertar(nami, 'nami')
  insertar(chopper, 'chopper')
  insertar(law, 'law')
        } else if (kimetsu.length >0){
          const tanjiro = []
    const zenitsu = []
    const tomioka = []
    const tengen = []
    const rengoku = []
    const kanroji = []
    for (let i = 0; i < kimetsu.length; i++) {
      if (kimetsu[i].personaje === 'tanjiro') {
        tanjiro.push(kimetsu[i])
      } else if (kimetsu[i].personaje === 'zenitsu') {
        zenitsu.push(kimetsu[i])
      } else if (kimetsu[i].personaje === 'tomioka') {
        tomioka.push(kimetsu[i])
      } else if (kimetsu[i].personaje === 'tengen') {
        tengen.push(kimetsu[i])
      } else if (kimetsu[i].personaje === 'rengoku') {
        rengoku.push(kimetsu[i])
      } else if (kimetsu[i].personaje === 'kanroji') {
        kanroji.push(kimetsu[i])
      };
    };
    console.log(tanjiro, zenitsu, tomioka, tengen, rengoku, kanroji)
    insertar(tanjiro, 'tanjiro')
    insertar(zenitsu, 'zenitsu')
    insertar(tomioka, 'tomioka')
    insertar(tengen, 'tengen')
    insertar(rengoku, 'rengoku')
    insertar(kanroji, 'kanroji')
  } else if (naruto.length >0){
    const Naruto = []
    const sasuke = []
    const kakashi = []
    
    for (let i = 0; i < naruto.length; i++) {
      if (naruto[i].personaje === 'naruto') {
        Naruto.push(naruto[i])
      } else if (naruto[i].personaje === 'sasuke') {
        sasuke.push(naruto[i])
      } else if (naruto[i].personaje === 'kakashi') {
        kakashi.push(naruto[i])
      } 
    };
    
    insertar(Naruto, 'naruto')
    insertar(sasuke, 'sasuke')
    insertar(kakashi, 'kakashi')
  
  }else if (jujutsu.length >0){
    const gojo = []
    const sukuna = []
    const megumi = []
    const todoroki = []
    const nobara = []
    const suguru = []
    for (let i = 0; i < jujutsu.length; i++) {
      if (jujutsu[i].personaje === 'gojo') {
        gojo.push(jujutsu[i])
      } else if (jujutsu[i].personaje === 'sukuna') {
        sukuna.push(jujutsu[i])
      } else if (jujutsu[i].personaje === 'megumi') {
        megumi.push(jujutsu[i])
      } else if (jujutsu[i].personaje === 'todoroki') {
        todoroki.push(jujutsu[i])
      } else if (jujutsu[i].personaje === 'nobara') {
        nobara.push(jujutsu[i])
      } else if (jujutsu[i].personaje === 'suguru') {
        suguru.push(jujutsu[i])
      };
    };
    insertar(gojo, 'gojo')
    insertar(sukuna, 'sukuna')
    insertar(megumi, 'megumi')
    insertar(todoroki, 'todoroki')
    insertar(nobara, 'nobara')
    insertar(suguru, 'suguru')
  } else if (dragonball.length>0){
    const goku = []
    const vegeta = []
    const freezer = []
    for (let i = 0; i < dragonball.length; i++) {
      if (dragonball[i].personaje === 'goku') {
        goku.push(dragonball[i])
      } else if (dragonball[i].personaje === 'vegeta') {
        vegeta.push(dragonball[i])
      } else if (dragonball[i].personaje === 'freezer') {
        freezer.push(dragonball[i])
      } 
    };
    insertar(goku, 'goku')
    insertar(vegeta, 'vegeta')
    insertar(freezer, 'freezer')
  }else if (hero.length>0){
    const deku = []
    const bakugo = []
    const shoto = []
    const uraraka = []
    const dabi = []
    const shigaraki = []
    for (let i = 0; i < hero.length; i++) {
      if (hero[i].personaje === 'deku') {
        deku.push(hero[i])
      } else if (hero[i].personaje === 'bakugo') {
        bakugo.push(hero[i])
      } else if (hero[i].personaje === 'shoto') {
        shoto.push(hero[i])
      } else if (hero[i].personaje === 'uraraka') {
        uraraka.push(hero[i])
      } else if (hero[i].personaje === 'dabi') {
        dabi.push(hero[i])
      } else if (hero[i].personaje === 'shigaraki') {
        shigaraki.push(hero[i])
      };
    };
   console.log(deku,bakugo,shoto,uraraka,dabi,shigaraki)
    insertar(deku, 'deku')
    insertar(bakugo, 'bakugo')
    insertar(shoto, 'shoto')
    insertar(uraraka, 'uraraka')
    insertar(dabi, 'dabi')
    insertar(shigaraki, 'shigaraki')
  }
};