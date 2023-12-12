const host='http://localhost:3000';

/**---------------------------------------------------Funciones de Login-----------------------------------------------------------------------------------------------*/
let login=()=>{
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    if(email==""||password==""){
        alert(`Todos los campos deben estar rellenos`);
    }else{
        fetch(`${host}/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email:email,password:password}),
        }).then((response)=>{
            return response.json();
        }).then((json)=>{
            console.log(json.message)
            if(json.message!=`El usuario no se encuentra registrado`){
                fetch(`${host}/compra/${json.userId}`)
                .then((response)=>{
                    return response.json()
                }).then((json)=>{
                    localStorage.setItem('compra',`${json.id}`);
                }).catch((error)=>{
                    console.error(error);
                });
                alert(`Login correcto`)
                localStorage.setItem('user',`${json.userId}`);
                localStorage.setItem('name',`${json.name}`)
                window.location.href='/html/index.html'
            }else{
                alert(`El email no se encuentra registrado`)
            }
        });
    };
};
/**-----------------------------------------------Funciones Registro usuario-----------------------------------------------------*/
let registrar=()=>{
    let nombre=document.getElementById('nombre').value;
    let apellidos=document.getElementById('apellidos').value;
    let email=document.getElementById('correo').value;
    let password=document.getElementById('pass').value;
    let repitePass=document.getElementById('repitePasword').value;
    if(nombre==""||apellidos==""||email==""||password==""||repitePass==""){
        alert(`Debes rellenar todos los campos.`)
    }else{
        if(password!=repitePass){
            alert(`Las contraseñas deben ser iguales`)
        }else{
            fetch(`${host}/registrar`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({nombre:nombre,apellidos:apellidos,email:email,password:password})
            }).then((response)=>{
                return response.json()
            }).then((json)=>{
                if(json.message==`Usuario registrado con éxito.`){
                    fetch(`${host}/login`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify({email:email,password:password}),
                    }).then((response)=>{
                        return response.json();
                    }).then((json)=>{
                        console.log(json.message)
                        if(json.message!=`El usuario no se encuentra registrado`){
                            fetch(`${host}/compra/${json.userId}`)
                            .then((response)=>{
                                return response.json()
                            }).then((json)=>{
                                localStorage.setItem('compra',`${json.id}`);
                            }).catch((error)=>{
                                console.error(error);
                            });
                            alert(`Login correcto`)
                            localStorage.setItem('user',`${json.userId}`);
                            localStorage.setItem('name',`${json.name}`)
                            window.location.href='/html/index.html'
                        };
                    });
                };
            });
        };
    };
};