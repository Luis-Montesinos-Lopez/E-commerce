const addMany=()=>{
    const cantidad=document.getElementById('cant').value;
    if (!user){
        alert('Debes iniciar sesión')
    }else{
        if(cantidad>=1){
        fetch(`${host}/addMany`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({compra_id:comId,producto_id:infoProd,cantidad:cantidad})
        }).then((response)=>{
            console.log(response)
            if(response.status===200){
                show(comId)
            }
        }).catch((error)=>{
            console.error(error)
        })
    }
    }
    
}