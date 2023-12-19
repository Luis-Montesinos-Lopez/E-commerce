const volver =()=>{
    localStorage.removeItem('infoProd')
    if(oferta===0){
        window.location.href=`/html/${tipo}.html`
    }else{
        window.location.href=`/html/index.html`
    }
    
}