const showInfo =(infoProd)=>{
    const img =document.getElementById('imgProd');
    const nombreProd=document.getElementById('nombreProd');
    const precioProd=document.getElementById('precioProd');
    const valoracionProd=document.getElementById('valoracionProd');
    const desc_larg=document.getElementById('desc_larg');
    const desc_cort=document.getElementById('desc_cort');
    const ref=document.getElementById('ref');
    fetch(`${host}/productoValoracion/${infoProd}`)
    .then((response)=>{
        return response.json()
    }).then((json)=>{
        if(json.nombre===null){
            fetch(`${host}/productos/${infoProd}`)
            .then((response)=>{
                return response.json()
            }).then((json)=>{
                if(json.oferta===1){
                    img.innerHTML=`<img class="zoom " src="${json.imagen_producto}"><p class="  badge text-bg-success">Oferta</p>`;
                }else{
                    img.innerHTML=`<img class="zoom" src="${json.imagen_producto}">`;
                }                
                nombreProd.innerHTML=`${json.nombre}`;
                precioProd.innerHTML=`${json.precio} <i class="bi bi-currency-euro m-color"> </i>`
                valoracionProd.innerHTML='<i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                desc_larg.innerHTML=`${json.descripcion_larga}`;
                desc_cort.innerHTML=`${json.descripcion_corta}`;
                ref.innerHTML=`${json.referencia}`;
                tipo=json.tipo;
                oferta=json.oferta;
            }).catch((error)=>{
                console.error(error)
            })
        }else{
            img.innerHTML=`<img class="zoom" src="${json.imagen_producto}">`;
                nombreProd.innerHTML=`${json.nombre}`;
                precioProd.innerHTML=`${json.precio} <i class="bi bi-currency-euro m-color"> </i>`
                let val=Math.round(json.valoracion*2)/2
                if(val===0){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===0.5){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-half"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===1){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===1.5){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-half"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===2){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===2.5){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-half"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===3){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i><i class="m-color bi bi-star"></i>';
                }else if(val===3.5){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-half"></i><i class="m-color bi bi-star"></i>';
                }else if(val===4){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star"></i>';
                }else if(val===4.5){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-half"></i>';
                }else if(val===5){
                    valoracionProd.innerHTML='<i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i><i class="m-color bi bi-star-fill"></i>';
                }
                
                desc_larg.innerHTML=`${json.descripcion_larga}`;
                desc_cort.innerHTML=`${json.descripcion_corta}`;
                ref.innerHTML=`${json.referencia}`;
                tipo=json.tipo;
                oferta=json.oferta;
        }
    }).catch((error)=>{
        console.error(error)
    })
};