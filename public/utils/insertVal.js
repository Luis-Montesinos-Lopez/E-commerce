const insertVal=()=>{
    if(user){
    const valoracion=document.getElementById('val').value;
    const comentario=document.getElementById('comentario').value;
    fetch(`${host}/valoraciones`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({usuario_id:user,valoracion:valoracion,comentario:comentario,producto_id:infoProd})
    }).then((response)=>{
        if(response.status===200){
            document.getElementById('comentario').value=""
            showInfo(infoProd);
            valoraciones(infoProd);
        }
    }).catch((error)=>{
        console.error(error)
    })
    }else{
        alert('Debes iniciar sesión para comentar')
    }
    
}