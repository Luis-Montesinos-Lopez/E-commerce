
let insertar=(mensaje,serie)=>{
    for(let i=0;i<mensaje.length;i++){
            let Serie=document.getElementById(`${serie}`);
            if(i==3){
                Serie.innerHTML+=`<div class="w-100"></div>
                <div class="card col-6 col-sm-3" >
            <img src="${mensaje[i].imagen_producto}" class="card-img-top" alt="..."><i class="bi bi-zoom-in m-color"></i>
            <div class="card-body">
              <h5 class="h5">${mensaje[i].nombre}</h5>
              <div class="precio">
                <h5>${mensaje[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${mensaje[i].id})">¡Lo quiero!</button>
            </div>
            </div>
          </div>`

            }else{
                   Serie.innerHTML+=` <div class="card col-6 col-sm-3" >
            <img src="${mensaje[i].imagen_producto}" class="card-img-top" alt="..."><i class="bi bi-zoom-in m-color"></i>
            <div class="card-body">
              <h5 class="h5">${mensaje[i].nombre}</h5>
              <div class="precio">
                <h5>${mensaje[i].precio}<i class="bi bi-currency-euro m-color"></i></h5>
                <div><span class="m-color"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></span><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="comprar">
                <button class="boton" onclick="addCarrito(${mensaje[i].id})">¡Lo quiero!</button>
            </div>
            </div>
          </div>` 
            }
                
    };
};

let showOfertas=()=>{
    fetch(`${host}/ofertas`)
    .then((response)=>{
        return response.json();
    }).then((json)=>{
        let onepiece=[];
        let kimetsu=[];
        let jujutsu=[];
        let naruto=[];
        let hero=[];
        let dragonball=[];        
        for(let i=0;i<json.length;i++){
            if(json[i].tipo=='onepiece'){
                onepiece.push(json[i]);
            }else if(json[i].tipo=='kimetsu'){
                kimetsu.push(json[i]);
            }else if (json[i].tipo=='jujutsu'){
                jujutsu.push(json[i]);
            }else if (json[i].tipo=='naruto'){
                naruto.push(json[i]);
            }else if (json[i].tipo=='hero'){
                hero.push(json[i]);
            }else if (json[i].tipo=='dragonball'){
                dragonball.push(json[i]);
            };
        };
        insertar(onepiece,'onepiece');
        insertar(kimetsu,'kimetsu');
        insertar(jujutsu,'jujutsu');
        insertar(naruto,'naruto');
        insertar(hero,'hero');
        insertar(dragonball,'dragonball');           
    }).catch((error)=>{
        console.error(error);
    });
};
let addCarrito=(prodId)=>{
    if(user==null){
        alert(`Debes iniciar sesión`),
        window.location.href='/html/login.html'
    }else{
        if(comId==0){
            fetch(`${host}/compraNueva/${user}/${prodId}`,{
                method:'POST'
            }).then((response)=>{
                return response.json()
            }).then((json)=>{
                console.log(json);
                localStorage.removeItem('compra')
                localStorage.setItem('compra',`${json.insertId}`)
                  let comId=localStorage.getItem('compra');
                  console.log(comId);
                fetch(`${host}/addProducto/${comId}/${prodId}`,{
                    method:'POST'
                }).then((response)=>{
                    return response.json();
                }).then((json)=>{
                    if(json.message==`Artículo añadido correctamente`){
                        window.location.href='/html/index.html';
                    }
                }).catch((error)=>{
                    console.error(error);
                }) ;    
            }).catch((error)=>{
                console.error(error);
            });
        }else{
            fetch(`${host}/addProducto/${comId}/${prodId}`,{
                method:'POST'
            }).then((response)=>{
                return response.json();
            }).then((json)=>{
                if(json.message==`Artículo añadido correctamente`||json.message==`Artículo actualizado correctamente`){
                    window.location.href='/html/index.html';
                }
            }).catch((error)=>{
                console.error(error);
            }) ;    
        };
    };
};

window.addEventListener('load',showOfertas)