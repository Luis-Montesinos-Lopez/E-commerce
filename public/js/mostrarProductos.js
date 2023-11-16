const host='http://localhost:3000';
window.addEventListener('load',(mostrarProductos)=>{});
    let mostrarProductos=()=>{
        fetch(`${host}/productos`)
    .then((response)=>{
        return response.json();
    }).then((json)=>{
        let products=document.getElementById('container')
        for(let i=0;i<json.length;i++){
        products.innerHTML+=`<tr><td>${json[i].id}</td><td>${json[i].nombre}</td><td>${json[i].valoracion}</td><td>${json[i].precio}</td><td>${json[i].descripcion_corta}</td><td><img src="${json[i].imagen_producto}" width="80" Heigth="50"></td>
        <td>${json[i].descripcion_larga}</td><td>${json[i].stock}</td><td>${json[i].cantidad}</td><td>${json[i].referencia}</td><td>${json[i].tipo}</td><td>${json[i].oferta}</td><td><buttom type="submit" class="btn btn-sm boton" onclick="editarProducto(${json[i].id})">Editar</buttom></td><td><buttom type="submit" class="btn btn-sm boton" onclick="eliminarProducto(${json[i].id})">Eliminar</buttom></td></tr>`
        };
        console.log(products)
    })
    };

mostrarProductos();
let eliminarProducto=(productoID)=>{

}