const express=require('express');
const mysql=require('mysql2');
const app=express();
app.use(express.static('public'));
app.use(express.json());
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"W3llc0m3@",
    database:"nakama_store",
});
connection.connect((err)=>{
    if(err){
        return console.err(`err: ${message.err}`);
    };
    console.log(`Connect to MYSQL!!`);
});
/**--------------------------------------------------Funciones útiles----------------------------------------------------------------------------*/
let handleSQLError=(response,error,result,callback)=>{
    if(error){
         response.status(400).send(`error: ${error.message}`);
    return;
    };
   callback(result);
};
/**---------------------------------------------------Fin funciones útiles------------------------------------------------------------------*/
/**---------------------------------------------------Endpoints productos-----------------------------------------------------------------*/
/*----------------------------------------------------Query de productos-----------------------------------------------------------------*/
app.get(`/productos`,(request,response)=>{
    connection.query(`select * from productos`,(error,result,fields)=>{
        handleSQLError(response,error,result,(result)=>{
            response.send(result);
        });
    });
});
/*-----------------------------------------------------Query de un producto------------------------------------------------------------------*/
app.get(`/productos/:id`,(request,response)=>{
    let productoId=request.params.id;
    connection.query(`select * from productos where id=${productoId}`,(error,result,fields)=>{
        handleSQLError(response,error,result,(result)=>{
            response.send(result[0]);
        });
    });
});
/*------------------------------------------------------Query registrar producto nuevo----------------------------------------------------------*/
app.post(`/producto`,(request,response)=>{
    let productoRef=request.body.referencia;
    connection.query(`select productos.referencia from productos where referencia='${productoRef}'`,(error,result,fields)=>{
        handleSQLError(response,error,result,(result)=>{
            if(result.length==0){
                connection.query(`insert into productos (nombre,valoracion,precio,descripcion_corta,imagen_producto,descripcion_larga,stock,cantidad,referencia,tipo,oferta) 
                values('${request.body.nombre}','${request.body.valoracion}','${request.body.precio}','${request.body.descripcion_corta}','${request.body.imagen_producto}','${request.body.descripcion_larga}','${request.body.stock}',
                '${request.body.cantidad}','${request.body.referencia}','${request.body.tipo}','${request.body.oferta}')`,(error,result,fields)=>{
                    handleSQLError(response,error,result,(result)=>{
                        response.send({message:`El producto se ha añadido correctamente.`});
                    });
                });
            }else{
                response.send({message:`El producto ya se encuentra registrado.`})
            };
        });
    });
    });
/*----------------------------------------------------------Query de update producto-----------------------------------------------------------*/
    app.post(`/producto/:id`,(request,response)=>{
        let productoId=request.params.id;
        connection.query(`Select referencia from productos where id='${request.params.referencia}'`,(error,result,fields)=>{
            handleSQLError(response,error,result,(result)=>{
                if(result.length==0){
                    response.send({message:`El producto no se encuentra registrado.`});
                }else{
                    connection.query(`update productos set nombre='${request.body.nombre}',valoracion='${request.body.valoracion}',precio='${request.body.precio}',
                    descripcion_corta='${request.body.descripcion_corta}',imagen_producto='${request.body.imagen_producto}',descripcion_larga='${request.body.descripcion_larga}',
                    stock='${request.body.stock}',cantidad='${request.body.cantidad}',referencia='${request.body.referencia}',tipo='${request.body.tipo}',oferta='${request.body.oferta}' where id='${productoId}'`,(error,result,fields)=>{
                        handleSQLError(response,error,result,(result)=>{
                            response.send({message:`El producto ha sido actualizado con éxito.`})
                        });
                    });
                };
            });
        });
    });
/**---------------------------------------------------------Fin Endpoints productos------------------------------------------------------------------*/
app.listen(3000,()=>{
    console.log(`Server up and running on 3000!!`);
});