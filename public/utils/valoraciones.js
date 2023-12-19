const valoraciones = (infoProd) => {
    const estrellas=document.getElementById('estrellas');
    const nombUser=document.getElementById('nombreUser');
    const coment=document.getElementById('comentarioUser');
    fetch(`${host}/valoraciones/${infoProd}`)
    .then((response)=>{
        return response.json()
    }).then((json)=>{
        console.log(json)
        if(json.message==='vacio'){
            estrellas.innerHTML=`<i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>`
            nombUser.innerHTML=`No hay ninguna valoración aún.`
            coment.innerHTML=`Se el primero!!`
        }else{
            if(json.valoracion===0){
                estrellas.innerHTML='<i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
            }else if(json.valoracion===1){
                estrellas.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
            }else if(json.valoracion===2){
                estrellas.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
            }else if(json.valoracion===3){
                estrellas.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
            }else if(json.valoracion===4){
                estrellas.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i>';
            }else if(json.valoracion===5){
                estrellas.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i>';
            };            
            nombUser.innerHTML=`${json.nombre} ${json.apellidos}`
            coment.innerHTML=`${json.comentario}`
        }
    }).catch((error)=>{
        console.error(error)
    })
}